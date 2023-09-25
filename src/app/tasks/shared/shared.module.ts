import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTemplateComponent } from './task-template/task-template.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
@NgModule({
  declarations: [TaskTemplateComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule,MatChipsModule],
  exports: [TaskTemplateComponent],
})
export class SharedModule {}
