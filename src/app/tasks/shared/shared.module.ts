import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTemplateComponent } from './task-template/task-template.component';

@NgModule({
  declarations: [TaskTemplateComponent],
  imports: [CommonModule],
  exports: [TaskTemplateComponent],
})
export class SharedModule {}
