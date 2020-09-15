import { Routes, RouterModule } from '@angular/router';
import { NotRoleComponent } from './not-role.component';

const routes: Routes = [
  { path: '', component: NotRoleComponent },
];

export const NotRoleRoutes = RouterModule.forChild(routes);
