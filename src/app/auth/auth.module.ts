import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effect';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment.development';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    EffectsModule.forFeature(),
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
