import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private apiUrl = environment.apiUrl;
  private configUrl = environment.configUrl;

  constructor(private _http: HttpClient) {}

  /**
   * Change the appearance of the widget form based on the provided configuration.
   * @param type - The type of appearance to change (e.g., 'color', 'font', etc.).
   * @param config - The configuration object with appearance settings.
   * @param formConfig - The original form configuration object.
   * @returns The updated form configuration object with the changed appearance.
   */
  public changeAppearance(type: string, config: any, formConfig: any): any {
    const appearancePath = `appearance.${type}`;
    Object.keys(config).forEach((key) => {
      this.setNestedValue(formConfig, `${appearancePath}.${key}`, config[key]);
    });
    return formConfig;
  }

  /**
   * Set a nested value in an object.
   * @param obj - The target object to set the value in.
   * @param path - The dot-separated path to the nested property.
   * @param value - The value to set.
   */
  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    let target = obj;
    while (keys.length > 1) {
      const key = keys.shift()!;
      if (!(key in target)) {
        target[key] = {};
      }
      target = target[key];
    }
    target[keys[0]] = value;
  }

  /**
   * Get the form configuration for the given form ID.
   * @param formId - The ID of the form to retrieve the configuration for.
   * @returns An observable that emits the form configuration data.
   */
  public getFormConfig(formId: string | null): Observable<any> {
    const endpoint = 'widget/' + formId;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + (window as any)['FORM_WIDGET_API_KEY'],
      'Content-Type': 'application/json',
    });

    return this._http.get<any>(this.configUrl + endpoint, { headers: headers });
  }

  /**
   * Save the user's form input values.
   * @param userInputValues - The object containing the user's form input values.
   * @returns An observable that emits the response data from the server.
   */
  public saveUserForm(userInputValues: any): Observable<any> {
    const endpoint = 'form';

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + (window as any)['FORM_WIDGET_API_KEY'],
      'Content-Type': 'application/json',
    });

    return this._http.put<any>(this.apiUrl + endpoint, userInputValues, {
      headers: headers,
    });
  }
}
