import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';


@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    SharedModule
  ]
})
export class VerifyModule { }
