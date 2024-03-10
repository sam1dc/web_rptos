import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
