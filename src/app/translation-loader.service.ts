import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslationLoaderService {
  private loadedNamespaces = new Set<string>();

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  initialize(namespaces: string[]): void {
    const initialLang = this.translate.currentLang || this.translate.defaultLang;
    this.loadNamespaces(initialLang, namespaces);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadNamespaces(event.lang, namespaces);
    });
  }

  private loadNamespaces(lang: string, namespaces: string[]): void {
    namespaces.forEach(ns => {
      const key = `${lang}:${ns}`;
      if (this.loadedNamespaces.has(key)) return;

      const url = `/i18n/${lang}/${ns}.json`;
      this.http.get<Record<string, any>>(url).subscribe({
        next: translations => {
          this.translate.setTranslation(lang, translations, true);
          this.loadedNamespaces.add(key);
        },
        error: () => {
          console.warn(`[i18n] Failed to load ${url}`);
        },
      });
    });
  }
}
