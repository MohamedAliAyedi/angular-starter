import { Component, effect, inject, signal } from '@angular/core';
import { AppStateRepository } from '../../../store/app-state/app-state.repository';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sm-language-switcher',
  templateUrl: './language-switcher.component.html',
  imports: [CommonModule, SelectModule, FormsModule],
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', name: '🇬🇧 English' },
    { code: 'fr', name: '🇫🇷 Français' },
    // { code: 'ar', name: '🇲🇷 العربية' },
  ];

  private rtlLanguages = ['ar'];

  selectedLanguage = signal(this.languages[0]);

  appStateRepository = inject(AppStateRepository);
  translate = inject(TranslateService);

  private initialized = false;

  constructor() {
    this.appStateRepository.state$.subscribe(state => {
      if (state.language) {
        this.selectedLanguage.set(state.language);
      }
    });

    effect(() => {
      const language = this.selectedLanguage();
      if (this.initialized) {
        const storeLang = this.appStateRepository.get('language');
        if (language !== storeLang) {
          this.appStateRepository.set('language', language);
        }
      }
    });

    effect(() => {
      const language = this.selectedLanguage();
      if (!this.initialized || !language) {
        this.initialized = true;
        this.detectRTL(language);
        return;
      }
    });
  }

  switchLanguage(language: any): void {
    this.selectedLanguage.set(language);
    this.translate.use(language);
    this.detectRTL(language);
  }

  detectRTL(language: any): void {
    const html = document.documentElement;
    if (this.rtlLanguages.includes(language)) {
      html.setAttribute('dir', 'rtl');
    } else {
      html.removeAttribute('dir');
    }
  }
}
