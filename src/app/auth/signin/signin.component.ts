import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonConstants } from 'src/app/utility/CommonConstants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signInForm! : FormGroup;
  constructor(private _auth: AuthService, private _fb : FormBuilder, private _snackBar : MatSnackBar, private _router : Router) { }

  ngOnInit(): void {
    this.signInForm = this._fb.group({
      'email' : ['',[Validators.required, Validators.email]],
      'password' : ['',[Validators.required]]
    });
  }

  get cn() {
    return this.signInForm.controls;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: CommonConstants.snack_bar_expiry,
    });
  }

  submitSignInForm(val:any){
    if(this.signInForm.status == 'INVALID') return;
    this._auth.signIn(this.signInForm.value).subscribe({
      next: (w:any)=>{
        this.openSnackBar(w.message, "Success");
        sessionStorage.setItem('user',JSON.stringify(w.user));
        sessionStorage.setItem('token', w.token);
        this._router.navigate(["../../tasks"]);
      },
      error: (err:any)=>{
        this.openSnackBar(err?.error.message, "Error");
      }
    })
  }

}
