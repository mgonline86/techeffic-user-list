import type { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    title: 'Home | Simple User List',
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./users/user/user.component').then((m) => m.UserComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
