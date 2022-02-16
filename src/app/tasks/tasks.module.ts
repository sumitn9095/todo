import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOverComponent } from './list-over/list-over.component';

import { SharedModule } from './shared/shared.module';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
/// import { chart } from 'chart.js';

@NgModule({
  declarations: [
    TasksComponent,
    ListComponent,
    CreateComponent,
    ListOverComponent,
    SearchComponent,
    TaskDetailsComponent,
    MyLineChartComponent,
    BarChartComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgChartsModule,
  ],
})
export class TasksModule {}
