import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { MultiSelect } from 'primeng/multiselect';
import { Button } from 'primeng/button';
import { FormConfig, FormFieldConfig } from './dynamic-form.types';

@Component({
  selector: 'tia-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputText, Select, DatePicker, Checkbox, RadioButton, Textarea, InputNumber, MultiSelect, Button],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() config!: FormConfig;
  @Input() initialValues?: any;
  @Input() submitButtonLabel = 'Suivant';
  @Input() cancelButtonLabel?: string;
  @Input() showSubmitButton = true;
  @Input() showCancelButton = false;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() formValueChange = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    if (this.initialValues) {
      this.form.patchValue(this.initialValues);
    }

    this.form.valueChanges.subscribe(values => {
      this.formValueChange.emit(values);
    });
  }

  private buildForm(): void {
    const formControls: any = {};

    this.config.fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.validators) {
        validators.push(...field.validators);
      }

      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      formControls[field.name] = [{ value: null, disabled: field.disabled || false }, validators];
    });

    this.form = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.getRawValue());
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Ce champ est requis';
      }
      if (control.errors['email']) {
        return 'Email invalide';
      }
      if (control.errors['min']) {
        return `La valeur minimale est ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `La valeur maximale est ${control.errors['max'].max}`;
      }
    }
    return '';
  }

  getFieldColspan(field: FormFieldConfig): string {
    const columns = this.config.columns || 2;
    const colspan = field.colspan || 1;

    if (columns === 1) {
      return 'col-span-1';
    }

    return colspan === 2 ? 'col-span-2' : 'col-span-1';
  }

  getFieldClasses(field: FormFieldConfig): string {
    const classes = [];
    if (this.isFieldInvalid(field.name)) {
      classes.push('ng-invalid', 'ng-dirty');
    }
    if (field.cssClass) {
      classes.push(field.cssClass);
    }
    return classes.join(' ');
  }

  resetForm(): void {
    this.form.reset();
  }

  patchFormValues(values: any): void {
    this.form.patchValue(values);
  }

  getFormValue(): any {
    return this.form.getRawValue();
  }

  isFormValid(): boolean {
    return this.form.valid;
  }
}
