import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTemplateComponent } from './task-template/task-template.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { CategoryRefForTaskDirective } from './category-ref-for-task.directive';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { DaysremainingPipe } from './daysremaining.pipe';
import { ModalComponent } from './modal/modal.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateComponent } from '../tasks/create/create.component';
@NgModule({
  declarations: [TaskTemplateComponent, CreateComponent,HeaderComponent,CategoryRefForTaskDirective, PlaceholderComponent, DaysremainingPipe, ModalComponent, ChartPieComponent, LoaderComponent, HeaderComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule,MatChipsModule,MatSelectModule,FormsModule, ReactiveFormsModule, MatListModule],
  exports: [HeaderComponent, CreateComponent,TaskTemplateComponent, CategoryRefForTaskDirective, PlaceholderComponent, DaysremainingPipe, ModalComponent, ChartPieComponent, LoaderComponent],
})
export class SharedModule {}
