import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WidgetService } from 'src/app/widget.service';

@Component({
  selector: 'large-widget',
  templateUrl: './large-widget.component.html',
  styleUrls: ['./large-widget.component.css'],
})
export class LargeWidgetComponent implements OnInit {
  @Input('config') formConfig: any = {};
  public additionalFields: boolean = false;
  public lhs_icon: string = 'fa-comments';

  // Variables to store form appearance data
  public appearance: any;
  public header: any;
  public background: any;
  public fields: any;
  public form: any;
  public formFields: any;
  public submitButton: any;

  // FormGroup to manage form controls and validations
  public formGroup: FormGroup = new FormGroup({});

  // Variables to control form submission messages
  public showSuccessMessage: boolean = false;
  public showFailureMessage: boolean = false;
  public errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private ws: WidgetService) {}

  ngOnInit() {
    // Initialize form appearance properties from formConfig
    this.appearance = this.formConfig['appearance'];
    this.header = this.appearance['header'];
    this.background = this.appearance['background'];
    this.formFields = this.appearance['form-fields'];
    this.fields = this.formConfig['fields'];
    this.form = this.fields['form'];
    this.submitButton = this.appearance['submit-button'];
    this.lhs_icon = this.fields['lhs-icon'] || 'fa-comments';

    // Generate form controls and apply validations based on form configuration
    const formGroupConfig: any = {};
    this.form.forEach((formField: any) => {
      if (formField['primary']) {
        switch (formField['type']) {
          case 'phone':
            formGroupConfig[formField['name']] = [
              '',
              [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(10),
                Validators.maxLength(10),
              ],
            ];
            break;
          case 'email':
            formGroupConfig[formField['name']] = [
              '',
              [Validators.required, Validators.email],
            ];
            break;
          default:
            formGroupConfig[formField['name']] = ['', Validators.required];
            break;
        }
      } else {
        formGroupConfig[formField['name']] = [''];
      }
    });

    // Create the FormGroup with formGroupConfig
    this.formGroup = this.formBuilder.group(formGroupConfig);
  }

  // Function to save the form data
  saveForm = (): void => {
    let userInputValues = this.formGroup.value;

    // Add additional properties to the userInputValues
    userInputValues['type'] = this.formConfig['type'];
    userInputValues['formId'] = this.formConfig['formId'];
    userInputValues['tenantId'] = this.formConfig['tenantId'];
    userInputValues['id'] =
      userInputValues['formId'] + '' + userInputValues['tenantId'];

    // Call the service method to save user form data
    this.ws.saveUserForm(userInputValues).subscribe((data) => {
      if (data['status'] == 'ok') {
        this.showSuccessMessage = true;
      } else {
        this.showFailureMessage = true;
        this.errorMessage =
          'Data has not saved on the server. Technical Error: ' + data['data'];
      }
    });
  };
}
