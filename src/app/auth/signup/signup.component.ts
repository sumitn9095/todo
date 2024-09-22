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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public isSignUpSubmitted : boolean = false;
  public signUpForm! : FormGroup;
  infoModal: Infomodal = {};
  passIsVisible:boolean=true;
  passIsVisible2:boolean=true;
  passwordMatch: boolean = false;
  processSignUp: boolean = false;

  constructor(private _cs : CommonService, private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router, private _r2: Renderer2) { }

  @ViewChild ('passdiv') passdiv! : ElementRef;

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      'username' : ['',[Validators.required, Validators.maxLength(60), Validators.minLength(3)]],
      'email' : ['',[Validators.required, Validators.email]],
      'password' : ['',[Validators.required, Validators.minLength(6)]],
      'password2' : ['',[Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm.valueChanges
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

  formStatus(){
    console.log("signUpForm.status",this.cn['password'].value)
  }

  // comparePassword: ValidatorFn = (
  //   control: AbstractControl
  // ): ValidationErrors | null => {
  //   return this.signUpForm.value.password === this.signUpForm.value.password2 ? null : {PasswordNoMatch:true};
  // };

  // comparePassword() : ValidationErrors | null {
  //   return this.signUpForm.value.password === this.signUpForm.value.password2 ? null : {PasswordNoMatch:true}
  // }

  get cn(){
    return this.signUpForm.controls;
  }

  closeInfoModal(data:any){
    //console.log("closeInfoModal",data);
    this.infoModal = {show : false};
  }

  submitSignUpForm(val:any){
    this.processSignUp = true;
    if(this.signUpForm.status == 'INVALID') return;
    this._cs.openSnackBarNoDuration("Loading...", "Success");
    this._auth.signUp(this.signUpForm.value).subscribe({
      next: (w:any)=>{
        this._cs.openSnackBar("Signed Up", "Success");
        //this._router.navigate(["../signin"]);
        this.isSignUpSubmitted = true;
        this.infoModal = {
          show: true,
          title: `Verification Email sent to ${this.signUpForm.value.email}`,
          message: "Please goto your email inbox and click the link sent in the Verification email.",
          infoModalType: "userCreated",
          actions: 'close'
        }
        this.processSignUp = false;
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err.error.message, "Error");
      }
    })
  }
}
