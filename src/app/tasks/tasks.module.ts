import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ListOverComponent } from './list-over/list-over.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    TasksComponent,
    ListComponent,
    CreateComponent,
    ListOverComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TasksModule {}
