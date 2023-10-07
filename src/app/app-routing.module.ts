import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { SinglePostComponent } from './posts/single-post/single-post.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'counter', loadChildren: () => import('./countermodule/countermodule.module').then(m => m.CountermoduleModule) },
  { path: 'posts', loadChildren: () => import('./postmoudule/postmoudule.module').then(m => m.PostmouduleModule),canActivate:[AuthGuardGuard] },
  { path:'posts/details/:id',component:SinglePostComponent},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
