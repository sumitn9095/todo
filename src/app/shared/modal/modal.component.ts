import { Component, Input, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { interval , take} from 'rxjs';
import { Infomodal } from 'src/app/utility/infomodal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  tmr : number = 0;
  @Input() public infoModal : Infomodal = {};
  @Input() public infoModalCategory : string = '';
  @Output() public modalCloseInit = new EventEmitter<boolean>(false);
  constructor(private _router: Router){}

  ngOnInit(): void {
    if(this.infoModal.actions === 'redirect') this.startTimerToLogin();
  }

  goBack = () => {
    this._router.navigate(['/']);
  }
  closeModal = () => {
    this.modalCloseInit.emit(true);
  }
  startTimerToLogin = () => {
    const tm = interval(2000);
    tm
    .pipe(take(6))
    .subscribe((k:any) => {
      this.tmr = k;
      if(k === 5) this.goBack();
    })
  }

}