import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WidgetService } from './widget.service';
import { environment } from 'src/environments/environment';

describe('WidgetService', () => {
  let service: WidgetService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WidgetService]
    });
    service = TestBed.inject(WidgetService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change the appearance of the form configuration', () => {
    // Arrange
    const type = 'color';
    const config = { primaryColor: '#ff0000', secondaryColor: '#00ff00' };
    const formConfig = { appearance: {} };
    const expectedFormConfig = { appearance: { color: { primaryColor: '#ff0000', secondaryColor: '#00ff00' } } };

    // Act
    const updatedFormConfig = service.changeAppearance(type, config, formConfig);

    // Assert
    expect(updatedFormConfig).toEqual(expectedFormConfig);
  });

  it('should get the form configuration for the given form ID', () => {
    // Arrange
    const formId = '123';
    const endpoint = 'widget/' + formId;
    const mockConfig = { /* mock form configuration object */ };
    const apiKey = 'mock_api_key';
    (window as any)["FORM_WIDGET_API_KEY"] = apiKey;

    // Act
    service.getFormConfig(formId).subscribe((response) => {
      // Assert
      expect(response).toEqual(mockConfig);
    });

    // Mock HTTP request
    const req = httpTestingController.expectOne(environment.configUrl + endpoint);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + apiKey);
    req.flush(mockConfig);
  });

  it('should save the user form input values', () => {
    // Arrange
    const userInputValues = { /* mock user input values */ };
    const endpoint = 'form';
    const apiKey = 'mock_api_key';
    (window as any)["FORM_WIDGET_API_KEY"] = apiKey;

    // Act
    service.saveUserForm(userInputValues).subscribe((response) => {
      // Assert
      expect(response).toBeDefined();
      // Add any additional expectations for the response here if needed
    });

    // Mock HTTP request
    const req = httpTestingController.expectOne(environment.apiUrl + endpoint);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + apiKey);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(userInputValues);
    req.flush({});
  });
});
