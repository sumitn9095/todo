import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HobbyRoutingModule } from './hobby-routing.module';
import { HobbyComponent } from './hobby.component';


@NgModule({
  declarations: [
    HobbyComponent
  ],
  imports: [
    CommonModule,
    HobbyRoutingModule,
    FormsModule
  ]
})
export class HobbyModule { }
