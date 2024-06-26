import { Component, ElementRef, OnInit, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators , ValidationErrors, AbstractControl, ValidatorFn} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Infomodal } from 'src/app/utility/infomodal';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  isForgetPasswordResetMode:boolean=false;
  public isForgotPasswordSubmitted : boolean = false;
  public forgotPasswordForm! : FormGroup;
  public forgotPasswordResetForm! : FormGroup;
  infoModal: Infomodal = {};
  passIsVisible:boolean=true;
  passIsVisible2:boolean=true;
  passwordMatch: boolean = false;

  constructor(private _cs : CommonService, private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router, private _r2: Renderer2, private _ar : ActivatedRoute) { }

  @ViewChild ('passdiv') passdiv! : ElementRef;

  ngAfterViewInit(): void {
    //this.infoModal = {show: true};
      // this.verificationMessage = 'User verification in progress';
      this._ar.params.subscribe((params: Params) => {
        let email = params['email'];
        let forgotPasswordSecret = params['secret'];
        console.log("email",email);
        if(forgotPasswordSecret !== undefined && email !== undefined) {
          let obj = {email, forgotPasswordSecret};
          this._auth.verifyForgetPassword(obj).subscribe({
            next: (res:any) => {
              this.isForgetPasswordResetMode = true;
              this.infoModal = {
                show: true,
                title: "User Verification Status",
                infoModalType: "userVerified",
                message: res.message,
                actions: "redirect"
              };
            },
            error: (err:any) => {
              this.infoModal = {
                error: true,
                title: "User Verification Status Error",
                infoModalType: "error",
                message: err.error.message,
                type: "error",
                actions: "close"
              };
            }
          })
        }
      })
  }

  ngOnInit(): void {
    this.forgotPasswordResetForm = this._fb.group({
      'password' : ['',[Validators.required]],
      'password2' : ['',[Validators.required]]
    });

    this.forgotPasswordForm = this._fb.group({
      'email' : ['',[Validators.required, Validators.email]]
    });

    this.forgotPasswordForm.valueChanges
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
    return this.forgotPasswordForm.controls;
  }

  submitForgotPasswordResetForm(val:any){
    if(this.forgotPasswordForm.status == 'INVALID') return;
    this._auth.forgotPasswordReset(this.forgotPasswordForm.value).subscribe({
      next: (w:any)=>{
        this._cs.openSnackBar("Signed Up", "Success");
        this.isForgotPasswordSubmitted = true;
        this.infoModal = {
          show: true,
          title: `Account Password ForgotPassword successful for ${this.forgotPasswordForm.value.email}`,
          message: `Please goto login page to signin with new password`,
          infoModalType: "standard",
          actions: 'close'
        }
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err.error.message, "Error");
      }
    })
  }


  submitForgotPasswordForm(val:any){
    if(this.forgotPasswordForm.status == 'INVALID') return;
    this._auth.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (w:any)=>{
        this.infoModal = {
          show: true,
          title: `Password Reset Link sent to ${this.forgotPasswordForm.value.email}`,
          infoModalType: "standard",
          message: `Please goto to your email, and click the link given to reset your Account Password.`,
          actions: "redirect"
        };
      },
      error: (err:any)=>{
        this.infoModal = this._cs.openModal('error');
        this.infoModal.title= `Error`;
        this.infoModal.message=`Some Error occured`;
      }
    });
  }
}
