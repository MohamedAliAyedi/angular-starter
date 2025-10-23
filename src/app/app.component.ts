import { Component, effect, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStateRepository } from './store/app-state/app-state.repository';
import { environment } from '../environments/environment';
import { AuthorizationService } from './authorization.service';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType } from 'keycloak-angular';

@Component({
  selector: 'sm-app-root',
  templateUrl: './app.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'zc-tia-bo';

  private appStateRepository = inject(AppStateRepository);
  private translate = inject(TranslateService);
  authService = inject(AuthorizationService);

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();
      if (keycloakEvent.type === KeycloakEventType.Ready && !this.authService.isAuthenticated()) {
        this.authService.login();
      }
    });
  }

  ngOnInit() {
    const storedLanguage = this.appStateRepository.get('language') as string | null;
    const finalLang = storedLanguage ?? (this.translate.getBrowserLang()?.match(/en|fr/)?.[0] || environment.defaultLanguage);
    this.translate.use(finalLang);
    this.appStateRepository.set('language', finalLang);
  }
}
