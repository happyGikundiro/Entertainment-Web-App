import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule }from '@angular/forms'

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
