import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetComponent } from './widget.component';
import { WidgetService } from '../widget.service';
import { of } from 'rxjs';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
  let widgetService: jasmine.SpyObj<WidgetService>;

  beforeEach(async () => {
    // Create a spy object for the WidgetService
    const widgetServiceSpy = jasmine.createSpyObj('WidgetService', [
      'getFormConfig',
      'changeAppearance',
    ]);

    // Configure the testing module
    await TestBed.configureTestingModule({
      declarations: [WidgetComponent],
      providers: [{ provide: WidgetService, useValue: widgetServiceSpy }],
    }).compileComponents();

    // Get the component and the service instance from the TestBed
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    widgetService = TestBed.inject(
      WidgetService
    ) as jasmine.SpyObj<WidgetService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch form configuration data when formId is provided', () => {
    // Arrange
    const formId = '123';
    const formConfigData = {
      status: 'ok',
      data: [{ id: '123', name: 'Form 1' }],
    };
    widgetService.getFormConfig.and.returnValue(of(formConfigData));

    // Act
    component.formId = formId;
    fixture.detectChanges();

    // Assert
    expect(widgetService.getFormConfig).toHaveBeenCalledWith(formId);
    expect(component.formConfig).toEqual(formConfigData.data[0]);
  });

  it('should not fetch form configuration data when formId is not provided', () => {
    // Arrange
    widgetService.getFormConfig.and.returnValue(of({ status: 'ok', data: [] }));

    // Act
    component.formId = null;
    fixture.detectChanges();

    // Assert
    expect(widgetService.getFormConfig).not.toHaveBeenCalled();
    expect(component.formConfig).toBeUndefined();
  });

  it('should call changeAppearance when changeWidgetAppearance function is invoked', () => {
    // Arrange
    const type = 'appearanceType';
    const config = { key: 'value' };
    const updatedFormConfig = {
      appearance: { appearanceType: { key: 'value' } },
    };
    widgetService.changeAppearance.and.returnValue(updatedFormConfig);

    // Act
    (window as any).changeWidgetAppearance(type, config);

    // Assert
    expect(widgetService.changeAppearance).toHaveBeenCalledWith(
      type,
      config,
      component.formConfig
    );
    expect(component.formConfig).toEqual(updatedFormConfig);
  });
});
