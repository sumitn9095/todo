import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'signin', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    { path: 'signout', loadChildren: () => import('./signout/signout.module').then(m => m.SignoutModule) },
    { path: 'verify/:email/:secret', loadChildren: () => import('./verify/verify.module').then(m => m.VerifyModule) },
    { path: 'reset', loadChildren: () => import('./reset/reset.module').then(m => m.ResetModule) },
    { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
    { path: 'forgot-password/:email/:secret', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
