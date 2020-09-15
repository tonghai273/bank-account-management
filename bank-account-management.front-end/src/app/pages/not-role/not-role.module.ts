import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotRoleComponent } from './not-role.component';
import { NotRoleRoutes } from './not-role.routing';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
  imports: [
    CommonModule,
    NzAlertModule,
    NotRoleRoutes
  ],
  declarations: [NotRoleComponent]
})
export class NotRoleModule { }
