import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../layout.service';
import { LayoutConfiguratorComponent } from '../configurator/layout-configurator.component';

@Component({
  selector: 'tia-layout-floating-configurator',
  imports: [ButtonModule, StyleClassModule, LayoutConfiguratorComponent],
  templateUrl: './layout-floating-configurator.component.html',
})
export class LayoutFloatingConfiguratorComponent {
  LayoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

  toggleDarkMode() {
    this.LayoutService.layoutConfig.update(state => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
