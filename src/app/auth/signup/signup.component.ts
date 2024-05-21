import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public isSignUpSubmitted : boolean = false;
  public signUpForm! : FormGroup;

  infoModalType : string = '';
  infoModalCategory : string = '';
  infoModal: any = {};

  constructor(private _cs : CommonService, private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router) { }

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      'username' : ['',[Validators.required]],
      'email' : ['',[Validators.required, Validators.email]],
      'password' : ['',[Validators.required]]
    });
  }

  get cn(){
    return this.signUpForm.controls;
  }

  submitSignUpForm(val:any){
    if(this.signUpForm.status == 'INVALID') return;
    this._auth.signUp(this.signUpForm.value).subscribe({
      next: (w:any)=>{
        this._cs.openSnackBar("Signed Up", "Success");
        //this._router.navigate(["../signin"]);
        this.isSignUpSubmitted = true;
        this.infoModalType = "userCreated";
        this.infoModalCategory = 'nonModal';
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err.error.message, "Error");
      }
    })
   
  }

}
