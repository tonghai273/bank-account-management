import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/shared/modules/ant-design.module';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutes
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
