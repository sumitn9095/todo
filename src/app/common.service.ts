import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonConstants } from './utility/CommonConstants';
import { Infomodal } from './utility/infomodal';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  infoModal: Infomodal | any = {};
  constructor(private _snackBar : MatSnackBar,) { }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: CommonConstants.snack_bar_expiry,
    });
  }

  openModal(modalType:string) {
    switch (modalType) {
      case 'loginTimeOut':
        this.infoModal = {
          error: true,
          message: '',
          infoModalType: 'loginTimeOut',
          title: "Login Time Out Error",
          actions: "redirect"
        }
        return this.infoModal;
        break;
      case 'chart':
        this.infoModal =  {
          show: true,
          message: '',
          infoModalType: 'chart',
          title: "Tasks chart",
          actions: "close"
        }
        return this.infoModal;
        break;
      case 'error':
        this.infoModal =  {
          error: true,
          message: '',
          infoModalType: 'error',
          title: "Error",
          actions: "close"
        }
        return this.infoModal;
        break;
      case 'taskCountError':
        this.infoModal =  {
          error: true,
          message: '',
          infoModalType: 'taskCountError',
          title: "Error",
          actions: "close"
        }
        return this.infoModal;
        break;
      default:
        break;
    }
  }
}
