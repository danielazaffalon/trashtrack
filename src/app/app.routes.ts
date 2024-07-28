import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/private/tabs/tabs.routes').then(m => m.routes),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login.page').then( m => m.LoginPage),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/public/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'usersettings',
    loadComponent: () => import('./pages/private/usersettings/usersettings.page').then( m => m.UsersettingsPage),
    ...canActivate(redirectUnauthorizedToLogin)
  }
];
