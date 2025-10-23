import { CommonModule } from '@angular/common';
import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { StepperPanelComponent } from './stepper-panel.component';

@Component({
  selector: 'tia-pro-stepper',
  standalone: true,
  imports: [CommonModule, StepperModule],
  templateUrl: './stepper-form.component.html',
  styleUrl: './stepper-form.component.scss',
})
export class StepperFormComponent implements AfterContentInit {
  @ContentChildren(StepperPanelComponent) panels!: QueryList<StepperPanelComponent>;

  activeIndex = 0;
  stepPanels: StepperPanelComponent[] = [];

  ngAfterContentInit() {
    this.stepPanels = this.panels.toArray();
  }

  isStepActive(index: number): boolean {
    return this.activeIndex === index;
  }

  isStepCompleted(index: number): boolean {
    return this.activeIndex > index;
  }

  nextStep() {
    if (this.activeIndex < this.stepPanels.length - 1) {
      this.activeIndex++;
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  goToStep(index: number) {
    if (index >= 0 && index < this.stepPanels.length) {
      this.activeIndex = index;
    }
  }
}
