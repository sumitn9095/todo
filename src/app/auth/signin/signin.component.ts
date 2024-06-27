import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Infomodal } from 'src/app/utility/infomodal';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signInForm! : FormGroup;
  infoModal: Infomodal = {};
  isForgetPasswordResetMode:boolean=false;
  constructor(private _cs : CommonService, private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router, private _ar: ActivatedRoute) { }
  ngOnInit(): void {
    this.signInForm = this._fb.group({
      'email' : ['',[Validators.required, Validators.email]],
      'password' : ['',[Validators.required]]
    });
  }


  get cn() {
    return this.signInForm.controls;
  }

  closeInfoModal(data:any){
    //console.log("closeInfoModal",data);
    this.infoModal = {show : false};
  }

  forgotPassword(){
    this.infoModal = {
      show: true,
      title: `Forgot Password`,
      message: `Do you wish to reset your account password, via 'Forgot Password'?`,
      infoModalType: "userCreated",
      actions: 'close'
    }
  }

  submitSignInForm(val:any){
    if(this.signInForm.status == 'INVALID') return;
    this._auth.signIn(this.signInForm.value).subscribe({
      next: (w:any)=>{
        sessionStorage.setItem('user',JSON.stringify(w.user));
        sessionStorage.setItem('todo_token', w.token);
        setTimeout(() => {
          this._router.navigate(["../../tasks"]);
          this._cs.openSnackBar(w.message, "Success");
        }, 1000);
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err?.error.message, "Error");
      }
    })
  }

}
