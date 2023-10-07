import { NgModule, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { appReducer } from './store/state/app.state';
import { AuthEffects } from './auth/state/auth.effect';
import { ApiInterceptorInterceptor } from './service/api-interceptor.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom.serializer';
import { SinglePostComponent } from './posts/single-post/single-post.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    SinglePostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot({serializer:CustomSerializer}),
  ],
  providers: [ {
    provide:HTTP_INTERCEPTORS,
    useClass:ApiInterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
