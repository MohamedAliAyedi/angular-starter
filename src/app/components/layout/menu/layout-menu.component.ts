import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { LayoutMenuItemComponent } from '../menuitem/layout-menu-item.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from '@/translation-loader.service';

@Component({
  selector: 'tia-layout-menu',
  standalone: true,
  imports: [CommonModule, LayoutMenuItemComponent, RouterModule],
  templateUrl: `./layout-menu.component.html`,
})
export class LayoutMenuComponent implements OnInit {
  model: MenuItem[] = [];

  translate = inject(TranslateService);
  translationLoader = inject(TranslationLoaderService);

  ngOnInit() {
    this.model = [
      {
        // label: 'sidebar.general',
        items: [
          { label: 'sidebar.dashboard', icon: PrimeIcons.DESKTOP, routerLink: ['/'] },
          { label: 'sidebar.users', icon: PrimeIcons.TH_LARGE, routerLink: ['/test'] },
        ],
      },
    ];
    this.model = this.model
      .filter(item => this.hasAccess(item))
      .map(item => ({
        ...item,
        items: item.items ? this.filterMenu(item.items) : undefined,
      }));
  }

  filterMenu(items: MenuItem[]): MenuItem[] {
    return items
      .filter(item => this.hasAccess(item))
      .map(item => ({
        ...item,
        items: item.items ? this.filterMenu(item.items) : undefined,
      }));
  }

  private hasAccess(item: MenuItem): boolean {
    if (!item['roles']) return true;
    return item['roles'].some((role: string) => this.hasRole(role));
  }

  private hasRole(role: string): boolean {
    // Implement your role-checking logic here
    return true;
  }
}
