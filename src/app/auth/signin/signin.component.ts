import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signInForm! : FormGroup;
  constructor(private _cs : CommonService, private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router) { }

  ngOnInit(): void {
    this.signInForm = this._fb.group({
      'email' : ['',[Validators.required, Validators.email]],
      'password' : ['',[Validators.required]]
    });
  }

  get cn() {
    return this.signInForm.controls;
  }

  submitSignInForm(val:any){
    if(this.signInForm.status == 'INVALID') return;
    this._auth.signIn(this.signInForm.value).subscribe({
      next: (w:any)=>{
        sessionStorage.setItem('user',JSON.stringify(w.user));
        sessionStorage.setItem('token', w.token);
        this._router.navigate(["../../tasks"]);
        this._cs.openSnackBar(w.message, "Success");
      },
      error: (err:any)=>{
        this._cs.openSnackBar(err?.error.message, "Error");
      }
    })
  }

}
