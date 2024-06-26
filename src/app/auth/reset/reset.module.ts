import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetRoutingModule } from './reset-routing.module';
import { ResetComponent } from './reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ResetComponent
  ],
  imports: [
    CommonModule,
    ResetRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatCardModule,
    MatButtonModule, MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    SharedModule
  ]
})
export class ResetModule { }
