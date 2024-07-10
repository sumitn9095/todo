import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utility/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:slug',
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'hobby', loadChildren: () => import('./hobby/hobby.module').then(m => m.HobbyModule) },
  { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule), canActivate: [AuthGuard] },
  { path: 'test', loadChildren: ()=>import('./test/test.module').then(m => m.TestModule)},
  { path: 'ngxs-demo', loadChildren: () => import('./ngxs-demo/ngxs-demo.module').then(m => m.NgxsDemoModule) },
  { path: 'ngxs-api-demo', loadChildren: () => import('./ngxs-api-demo/ngxs-api-demo.module').then(m => m.NgxsApiDemoModule) },
  // { path: 'change-detection-with-signal', loadChildren: ()=>import('./change-detection-with-signal/change-detection-with-signal.component').then(m => m.ChangeDetectionWithSignalComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
