import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) }, { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
