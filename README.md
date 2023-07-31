**FormWidget Angular App**

This project is an Angular application that provides a customizable form widget for collecting user feedback. It allows users to integrate a feedback collection form into their websites and customize its appearance dynamically using JavaScript.

### Getting Started

To get started with this project, follow the instructions below:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using `npm install`.
4. Build the Angular app using `ng build`.
5. Serve the application locally using `ng serve`.

### Project Structure

The project consists of the following components and services:

1. `WidgetComponent`: The main component that represents the form widget. It handles the dynamic appearance changes and form submissions.

2. `LargeWidgetComponent`: A child component used to display a larger version of the widget with additional fields.

3. `SmallWidgetComponent`: A child component used to display a smaller version of the widget.

4. `WidgetService`: A service responsible for interacting with the server to fetch form configurations and save user form submissions.

5. `FormBuilder` and `FormGroup`: Angular's form builder and form group classes to manage form fields and validations.

6. External Libraries: The project uses the `FontAwesomeModule` for icons and `HttpClientModule` to make HTTP requests.

### How to Use

To integrate the form widget into your website, follow these steps:

1. Include the FormWidget Angular app in your website using a script tag.

```html
<script src="path/to/form-widget.js"></script>
```

2. Add the FormWidget HTML tag with the desired formId.

```html
<form-widget formId="yourFormId"></form-widget>
```

3. Optionally, you can use the provided JavaScript functions to dynamically change the appearance of the widget.

### Dynamic JS Operations

The sample webpage provides examples of dynamic JS operations to change the appearance of the form widget:

1. Change Heading Color: Set the color of the widget's heading or title.

2. Submit Button Background Color: Set the background color of the widget's submit button.

3. Submit Button Alignment: Align the widget's submit button to the left, right, or center.

4. Form Background Color: Set the background color of the form.

5. And all the fields in appearance section. Sample json available as sample-entries.json.

### API Key

The FormWidget Angular app requires an API key to communicate with the server for fetching form configurations and saving user form submissions. Ensure that the `FORM_WIDGET_API_KEY` variable is set with the valid API key.

### Customization

You can customize the appearance of the widget by modifying the Angular components and templates. Additionally, you can add more form fields and appearance options as needed.