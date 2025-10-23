import { Component, ElementRef } from '@angular/core';
import { LayoutMenuComponent } from '../menu/layout-menu.component';

@Component({
  selector: 'sm-layout-sidebar',
  standalone: true,
  imports: [LayoutMenuComponent],
  templateUrl: `./layout-sidebar.component.html`,
  styleUrl: `./layout-sidebar.component.scss`,
})
export class LayoutSidebarComponent {
  constructor(public el: ElementRef) {}
}
