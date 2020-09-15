import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutes } from './layout.routing';
import { ListAccountComponent } from './components/list-account/list-account.component';
import { DetailAccountComponent } from './components/detail-account/detail-account.component';
import { NgZorroAntdModule } from 'src/app/shared/modules/ant-design.module';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponentComponent } from 'src/app/shared/components/table-component/table-component.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    LayoutRoutes
  ],
  declarations: [
    LayoutComponent,
    ListAccountComponent,
    DetailAccountComponent,
    AddAccountComponent,
    TableComponentComponent
  ]
})
export class LayoutModule { }
