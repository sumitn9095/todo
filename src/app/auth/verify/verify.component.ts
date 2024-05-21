import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})

export class VerifyComponent implements OnInit, AfterViewInit {
  username: string | null = '';
  verifySecret: string | null = '';
  isUserVerified: any = null;
  verificationMessage : string | null = '';
  infoModalType : string = '';
  infoModalCategory : string = '';
  infoModal: any = {};

  constructor(private _ar : ActivatedRoute, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    // this._ar.params.subscribe((params: Params)=>{
    //   let username = params['username'];
    //   console.log("username",username);
    // })
  }

 ngAfterViewInit(): void {
  this.infoModalType = 'userVerified';
  this.infoModalCategory = 'nonModal';
  this.infoModal = {show: true};
  this.verificationMessage = 'User verification in progress';
    this._ar.params.subscribe((params: Params)=>{
      let email = params['email'];
      console.log("email",email);
     let verifySecret = params['secret'];
      let obj = {email, verifySecret}
      console.log("verify",obj);
      this._auth.verify(obj).subscribe({
        next: (res:any) => {
          this.isUserVerified = true;
          this.verificationMessage = res.message;
        },
        error: (err:any) => {
          this.isUserVerified = false;
          this.infoModalType = 'userVerified';
          this.infoModalCategory = 'nonModal';
          this.infoModal = {error: true};
          this.verificationMessage = err.error.message;
        }
      })
    })
 }
}