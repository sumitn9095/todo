import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonConstants } from './utility/CommonConstants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private _snackBar : MatSnackBar,) { }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: CommonConstants.snack_bar_expiry,
    });
  }
}
