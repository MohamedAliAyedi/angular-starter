import { DynamicFormComponent } from '@/components/shared/dynamic-form/dynamic-form.component';
import { FormConfig } from '@/components/shared/dynamic-form/dynamic-form.types';
import { Component } from '@angular/core';

@Component({
  selector: 'tia-dashboard',
  imports: [DynamicFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  formConfig: FormConfig = {
    columns: 2,
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter first name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
        required: true,
      },
    ],
  };

  onSubmit(formValues: any): void {
    console.log('Form submitted with values:', formValues);
  }
}
