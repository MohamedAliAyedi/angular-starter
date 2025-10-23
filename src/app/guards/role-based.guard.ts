import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AuthorizationService } from '@/authorization.service';

export function roleBasedGuard(requiredRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthorizationService);
    const router = inject(Router);

    return authService.isReady$.pipe(
      filter(ready => ready),
      take(1),
      switchMap(() => {
        console.log('Checking roles for access:', requiredRoles);
        if (!authService.isAuthenticated()) {
          return [router.parseUrl('/unauthorized')];
        }
        return authService.getObservableRoles().pipe(
          map(userRoles => {
            const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
            return hasRequiredRole ? true : router.parseUrl('/unauthorized');
          })
        );
      })
    );
  };
}
