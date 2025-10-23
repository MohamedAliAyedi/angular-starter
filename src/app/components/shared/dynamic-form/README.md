# Dynamic Form Component

A reusable, configuration-based form builder component using PrimeNG.

## Usage

### Basic Example

```typescript
import { DynamicFormComponent } from './components/shared/dynamic-form/dynamic-form.component';
import { FormConfig } from './components/shared/dynamic-form/dynamic-form.types';

@Component({
  template: `
    <tia-dynamic-form
      [config]="formConfig"
      [submitButtonLabel]="'Submit'"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class MyComponent {
  formConfig: FormConfig = {
    columns: 2,
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter first name',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
        required: true
      }
    ]
  };

  onSubmit(data: any) {
    console.log('Form data:', data);
  }
}
```

## Field Types

- `text` - Text input
- `email` - Email input with validation
- `number` - Number input
- `textarea` - Multi-line text
- `dropdown` - Select dropdown
- `multiselect` - Multiple selection
- `calendar` - Date picker
- `checkbox` - Checkbox
- `radio` - Radio buttons

## Field Configuration

```typescript
{
  name: string;              // Field name (required)
  label: string;             // Field label (required)
  type: FormFieldType;       // Field type (required)
  placeholder?: string;      // Placeholder text
  required?: boolean;        // Is field required
  disabled?: boolean;        // Is field disabled
  options?: FormFieldOption[]; // Options for dropdown/multiselect/radio
  validators?: any[];        // Custom validators
  colspan?: 1 | 2;          // Column span (1 or 2)
  rows?: number;            // Rows for textarea
  min?: number;             // Min value for number
  max?: number;             // Max value for number
  dateFormat?: string;      // Date format for calendar
  showTime?: boolean;       // Show time picker
  cssClass?: string;        // Custom CSS class
}
```

## Component Inputs

- `config` (required) - Form configuration
- `initialValues` - Initial form values
- `submitButtonLabel` - Submit button text (default: 'Suivant')
- `cancelButtonLabel` - Cancel button text
- `showSubmitButton` - Show submit button (default: true)
- `showCancelButton` - Show cancel button (default: false)

## Component Outputs

- `formSubmit` - Emitted when form is submitted
- `formCancel` - Emitted when cancel is clicked
- `formValueChange` - Emitted when form values change

## Methods

- `resetForm()` - Reset form to initial state
- `patchFormValues(values)` - Update form values
- `getFormValue()` - Get current form values
- `isFormValid()` - Check if form is valid
