import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { BehaviorSubject, filter, Observable, switchMap, take } from 'rxjs';
import { UserRole } from './types/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  keycloak = inject(Keycloak);

  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  private readySubject = new BehaviorSubject(false);
  isReady$ = this.readySubject.asObservable();

  constructor() {
    if (this.keycloak.authenticated) {
      this.loadRoles();
      this.readySubject.next(true);
    } else {
      this.keycloak.onAuthSuccess = () => {
        this.loadRoles();
        this.readySubject.next(true);
      };
      this.keycloak.onAuthLogout = () => {
        this.rolesSubject.next([]);
        this.readySubject.next(false);
      };
    }
  }

  init() {
    this.loadRoles();
  }

  private loadRoles() {
    const roles = this.keycloak.tokenParsed?.realm_access?.roles || [];
    this.rolesSubject.next(roles);
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  getObservableRoles(): Observable<string[]> {
    return this.isReady$.pipe(
      filter(ready => ready),
      switchMap(() => this.roles$),
      take(1)
    );
  }

  getUserId(): Promise<string | undefined> {
    // return this.isAuthenticated()
    //   ? this.profileService
    //       .getProfile()
    //       .toPromise()
    //       .then(user => user?.id)
    //   : Promise.resolve(undefined);
    return Promise.resolve('1');
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  hasRoles(roles: string[]): boolean {
    return roles.some(role => this.getRoles().includes(role));
  }

  // Helpers optionnels
  isAdminCentral(): boolean {
    return this.getRoles().includes(UserRole.ADMIN_CENTRAL);
  }

  getRoles(): string[] {
    return this.rolesSubject.getValue() ?? [];
  }
}
