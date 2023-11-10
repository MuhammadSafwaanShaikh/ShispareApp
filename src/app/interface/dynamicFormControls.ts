export interface DynamicFormControl {
  key: string;
  label: string;
  controlType: string;
  type: string; // Example: 'input', 'dropdown', 'textarea', etc.
  //   options?: { id: any; label: any }[]; // For dropdown or radio inputs
  options?: any[]; // For dropdown or radio inputs
  // Add validation rules if needed
}
