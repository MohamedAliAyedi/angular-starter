export type FormFieldType = 'text' | 'email' | 'number' | 'textarea' | 'dropdown' | 'calendar' | 'checkbox' | 'radio' | 'multiselect';

export interface FormFieldOption {
  label: string;
  value: any;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: FormFieldOption[];
  validators?: any[];
  colspan?: 1 | 2;
  rows?: number;
  min?: number;
  max?: number;
  dateFormat?: string;
  showTime?: boolean;
  cssClass?: string;
}

export interface FormConfig {
  fields: FormFieldConfig[];
  columns?: 1 | 2;
}
