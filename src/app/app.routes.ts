import { Routes } from '@angular/router';
import { LayoutMainComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TestComponent } from './pages/test/test.component';
import { roleBasedGuard } from './guards/role-based.guard';
import { UserRole } from './types/user.types';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: '', component: DashboardComponent },
      //rest
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'unauthorized', component: ForbiddenComponent },
    ],
  },
  {
    path: 'test',
    // canActivate: [roleBasedGuard([UserRole.SUPER_ADMIN, UserRole.ADMIN_CENTRAL])],
    component: LayoutMainComponent,
    children: [{ path: '', component: TestComponent }],
  },
];
