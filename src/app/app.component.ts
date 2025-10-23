import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStateRepository } from './store/app-state/app-state.repository';
import { environment } from '../environments/environment';

@Component({
  selector: 'tia-app-root',
  templateUrl: './app.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'zc-tia-bo';

  private appStateRepository = inject(AppStateRepository);
  private translate = inject(TranslateService);

  ngOnInit() {
    const storedLanguage = this.appStateRepository.get('language') as string | null;
    const finalLang = storedLanguage ?? (this.translate.getBrowserLang()?.match(/en|fr/)?.[0] || environment.defaultLanguage);
    this.translate.use(finalLang);
    this.appStateRepository.set('language', finalLang);
  }
}
