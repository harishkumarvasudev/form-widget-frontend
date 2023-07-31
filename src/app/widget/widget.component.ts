import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WidgetService } from '../widget.service';

@Component({
  selector: 'form-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  public formConfig: any;
  private window: Window = <any>document.defaultView;
  private formId: string | null = "";

  constructor(public ws: WidgetService, private cd: ChangeDetectorRef) {
    // Get the formId from the attribute on the form-widget element
    if (document.getElementsByTagName("form-widget")[0].getAttribute("formId")) {
      this.formId = document.getElementsByTagName("form-widget")[0].getAttribute("formId");
      // Fetch the form configuration data from the server based on the formId
      this.ws.getFormConfig(this.formId).subscribe(data => {
        if (data["status"] == "ok") {
          this.formConfig = data["data"][0];
        }
      });
    }

    // Expose the "changeWidgetAppearance" function to the global window object
    // This function allows external scripts to change the widget appearance
    (<any>this.window).changeWidgetAppearance = (type: string, config: any) => {
      this.formConfig = this.ws.changeAppearance(type, config, this.formConfig);
      // Manually trigger change detection to update the view
      this.cd.detectChanges();
    };
  }
}