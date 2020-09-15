import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'not-role', loadChildren: () => import('./pages/not-role/not-role.module').then(m => m.NotRoleModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
