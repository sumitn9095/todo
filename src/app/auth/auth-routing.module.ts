import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [{ path: '', component: AuthComponent }, { path: 'signin', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) }, { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) }, { path: 'signout', loadChildren: () => import('./signout/signout.module').then(m => m.SignoutModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
