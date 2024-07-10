import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ValidationErrors, AbstractControl, ValidatorFn} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { Infomodal } from 'src/app/utility/infomodal';
// import { confirmPasswordValidator } from './confirm-password.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  public isResetSubmitted : boolean = false;
  public resetForm! : FormGroup;
  infoModal: Infomodal = {};
  passIsVisible0:boolean=true;
  passIsVisible:boolean=true;
  passIsVisible2:boolean=true;
  passwordMatch: boolean = false;
  processReset: boolean = false;

  constructor(private _cs : CommonService, private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router, private _r2: Renderer2) { }

  @ViewChild ('passdiv') passdiv! : ElementRef;

  ngOnInit(): void {
    this.resetForm = this._fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password0' : ['',[Validators.required]],
      'password' : ['',[Validators.required, Validators.minLength(6)]],
      'password2' : ['',[Validators.required, Validators.minLength(6)]]
    });

    this.resetForm.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(1500)
    )
    .subscribe({
      next: (a:any) => {
        console.log
        if(a.password === a.password2) {
          this.passwordMatch = true;
          this._r2.addClass(this.passdiv.nativeElement,"animate__bounceIn");
          setTimeout(() => {
            this._r2.removeClass(this.passdiv.nativeElement,"animate__bounceIn");
          }, 1000);
        }
        else {
          this.passwordMatch = false;
          this._r2.addClass(this.passdiv.nativeElement,"animate__shakeX");
          setTimeout(() => {
            this._r2.removeClass(this.passdiv.nativeElement,"animate__shakeX");
          }, 1000);
        }
      }
    })
  }

  get cn(){
    return this.resetForm.controls;
  }

  closeInfoModal(data:any){
    //console.log("closeInfoModal",data);
    this.infoModal = {show : false};
  }

  submitResetForm(val:any){
    this.processReset = true;
    if(this.resetForm.status == 'INVALID') return;
    this._auth.reset(this.resetForm.value).subscribe({
      next: (w:any)=>{
        this.isResetSubmitted = true;
        this._cs.openSnackBar("Signed Up", "Success");
        this.isResetSubmitted = true;
        this.infoModal = {
          show: true,
          title: `Account Password Reset successful for ${this.resetForm.value.email}`,
          message: `Please goto login page to signin with new password`,
          infoModalType: "userCreated",
          actions: "redirect"
        }
        this.processReset = false;
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err.error.message, "Error");
      }
    })
  }
}
