import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../layout.service';
import { LayoutConfiguratorComponent } from '../configurator/layout-configurator.component';
import { LanguageSwitcherComponent } from '../../shared/language-switcher/language-switcher.component';

@Component({
  selector: 'tia-layout-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, LayoutConfiguratorComponent, LanguageSwitcherComponent],
  templateUrl: `./layout-topbar.component.html`,
})
export class LayoutTopbarComponent {
  items!: MenuItem[];

  layoutService = inject(LayoutService);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update(state => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
