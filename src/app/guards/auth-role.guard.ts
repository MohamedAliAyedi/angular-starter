import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (route: ActivatedRouteSnapshot, __: RouterStateSnapshot, authDate: AuthGuardData): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authDate;

  const requiredRole = route.data['role'];
  if (!requiredRole) {
    return false;
  }

  const hasRequiredRole = (role: string): boolean => Object.values(grantedRoles.realmRoles).some(roles => roles.includes(role));
  if (authenticated && hasRequiredRole(requiredRole)) {
    return true;
  }

  const router = inject(Router);

  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
