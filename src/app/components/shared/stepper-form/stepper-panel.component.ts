import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tia-stepper-panel',
  standalone: true,
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class StepperPanelComponent {
  @Input() label = '';
  @Input() subLabel?: string;
  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<any>;
}
