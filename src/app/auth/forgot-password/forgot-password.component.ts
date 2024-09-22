import { Component, ElementRef, OnInit, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators , ValidationErrors, AbstractControl, ValidatorFn} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Infomodal } from 'src/app/utility/infomodal';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
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
  email:string='';
  resetSecret:string='';
  processForgotPassword : boolean = false;

  constructor(private _cs : CommonService, private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router, private _r2: Renderer2, private _ar : ActivatedRoute) { }

  @ViewChild ('passdiv') passdiv! : ElementRef;

  ngAfterViewInit(): void {
    //this.infoModal = {show: true};
      // this.verificationMessage = 'User verification in progress';
      this._ar.params.subscribe((params: Params) => {
        let email = params['email'];
        let resetSecret = params['secret'];
        console.log("email",email);
        if(resetSecret !== undefined && email !== undefined) {
          let obj = {email, resetSecret};
          this._auth.verifyForgetPassword(obj).subscribe({
            next: (res:any) => {
              this.isForgetPasswordResetMode = true;
              this.email = email;
              this.resetSecret = resetSecret;
              this.infoModal = {
                show: true,
                title: "Forgot Password Verification Status",
                infoModalType: "userVerified",
                message: res.message,
                actions: "close"
              };
            },
            error: (err:any)=>{
              this._cs.openSnackBar(err.error.message, "Error");
            }
          })
        }
      })
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this._fb.group({
      'email' : ['',[Validators.required, Validators.email]]
    });
    this.forgotPasswordResetForm = this._fb.group({
      'password' : ['',[Validators.required]],
      'password2' : ['',[Validators.required]]
    });

    this.forgotPasswordResetForm.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(1500)
    )
    .subscribe({
      next: (a:any) => {
        if(a.password === a.password2) {
          this.passwordMatch = true;
        }
        else {
          this.passwordMatch = false;
          this._r2.addClass(this.passdiv.nativeElement,"animate__shakeX");
          setTimeout(() => {
            this._r2.removeClass(this.passdiv.nativeElement,"animate__shakeX");
          }, 1000);
        }
        
      }, 
      error: (err:any)=>{
        this._cs.openSnackBar(err?.error.message, "Error");
        this._r2.addClass(this.passdiv.nativeElement,"animate__shakeX");
        setTimeout(() => {
          this._r2.removeClass(this.passdiv.nativeElement,"animate__shakeX");
        }, 3000);
      },
      complete: ()=>{
        
      }
    })
  }

  get cn(){
    return this.forgotPasswordForm.controls;
  }

  get cn2(){
    return this.forgotPasswordResetForm.controls;
  }

  closeInfoModal(data:any){
    console.log("closeInfoModal",data);
    this.infoModal = {show : false};
  }

  formStatus(){
    console.log("formStatus",this.cn);
  }

  submitForgotPasswordResetForm(val:any){
    if(this.forgotPasswordResetForm.status == 'INVALID') return;
    this._cs.openSnackBarNoDuration("Loading...", "Success");
    let obj = {email: this.email, resetSecret: this.resetSecret, ...this.forgotPasswordResetForm.value}
    this._auth.forgotPasswordReset(obj).subscribe({
      next: (w:any)=>{
        this._cs.openSnackBar("Signed Up", "Success");
        this.isForgotPasswordSubmitted = true;
        this.infoModal = {
          show: true,
          title: `Account Password ForgotPassword successful for ${this.email}`,
          message: `Please goto login page to signin with new password`,
          infoModalType: "standard",
          actions: 'redirect'
        }
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err?.error.message, "Error");
        this._r2.addClass(this.passdiv.nativeElement,"animate__shakeX");
        setTimeout(() => {
          this._r2.removeClass(this.passdiv.nativeElement,"animate__shakeX");
        }, 3000);
      },
    })
  }


  submitForgotPasswordForm(val:any){
    this.processForgotPassword = true;
    if(this.forgotPasswordForm.status == 'INVALID') return;
    this._cs.openSnackBarNoDuration("Loading...", "Success");
    this._auth.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (w:any)=>{
        this.infoModal = {
          show: true,
          title: `Password Reset Link sent to ${this.forgotPasswordForm.value.email}`,
          infoModalType: "standard",
          message: `Please goto to your email, and click the link given to reset your Account Password.`,
          actions: "redirect"
        };
        this.processForgotPassword = false;
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err?.error.message, "Error");
        this._r2.addClass(this.passdiv.nativeElement,"animate__shakeX");
        setTimeout(() => {
          this._r2.removeClass(this.passdiv.nativeElement,"animate__shakeX");
        }, 3000);
      },
    });
  }
}
