import { Attribute, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetService } from './widget.service';
import { createCustomElement } from '@angular/elements';

// Components
import { WidgetComponent } from './widget/widget.component';
import { LargeWidgetComponent } from './widget/large-widget/large-widget.component';
import { SmallWidgetComponent } from './widget/small-widget/small-widget.component';

@NgModule({
  // Declarations: Components and Directives used within the module
  declarations: [WidgetComponent, LargeWidgetComponent, SmallWidgetComponent],
  // Imports: Modules used within the module
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  // Providers: Services and other injectable objects provided at the module level
  providers: [WidgetService],
  // Bootstrap: Root component(s) that will be bootstrapped when the module is loaded
  bootstrap: [WidgetComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    // Define a custom Angular element for the WidgetComponent
    const el = createCustomElement(WidgetComponent, { injector });
    customElements.define('form-widget', el);
  }
}
