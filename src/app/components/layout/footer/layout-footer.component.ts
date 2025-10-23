import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sm-layout-footer',
  imports: [CommonModule],
  templateUrl: `./layout-footer.component.html`,
})
export class LayoutFooterComponent {
  copyrightYear = new Date().getFullYear();
  copyrightName = 'Portail des Métiers';
  copyrightLink = '';
  copyrightText = `Copyright © ${this.copyrightYear} ${this.copyrightName}`;
}
