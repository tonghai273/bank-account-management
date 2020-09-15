import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { DetailAccountComponent } from './components/detail-account/detail-account.component';
import { ListAccountComponent } from './components/list-account/list-account.component';
import { LayoutComponent } from './layout.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { Role } from 'src/app/shared/models/role';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'list-account', component: ListAccountComponent },
      { path: 'detail-account/:id', component: DetailAccountComponent, canLoad: [AuthGuard], canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'add-account', component: AddAccountComponent, canLoad: [AuthGuard], canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: '', redirectTo: 'list-account', pathMatch: 'full' },
    ],
  },
];

export const LayoutRoutes = RouterModule.forChild(routes);
