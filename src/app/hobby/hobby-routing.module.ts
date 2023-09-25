import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HobbyComponent } from './hobby.component';

const routes: Routes = [{ path: '', component: HobbyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HobbyRoutingModule { }
