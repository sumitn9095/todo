import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTemplateComponent } from './task-template/task-template.component';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TaskTemplateComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule],
  exports: [TaskTemplateComponent],
})
export class SharedModule {}
