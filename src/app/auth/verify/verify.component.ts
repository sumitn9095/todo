import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Infomodal } from 'src/app/utility/infomodal';
import { CommonService } from 'src/app/common.service';

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
  infoModal: Infomodal = {};

  constructor(private _cs : CommonService, private _ar : ActivatedRoute, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    // this._ar.params.subscribe((params: Params)=>{
    //   let username = params['username'];
    //   console.log("username",username);
    // })
  }

 ngAfterViewInit(): void {
  this.infoModal = {show: true};
  this._cs.openSnackBarNoDuration("Loading...", "Success");
  this.verificationMessage = 'User verification in progress';
    this._ar.params.subscribe((params: Params)=>{
      let email = params['email'];
      console.log("email",email);
      let verifySecret = params['secret'];
      let obj = {email, verifySecret};
      console.log("verify",obj);
      this._auth.verify(obj).subscribe({
        next: (res:any) => {
         // this.isUserVerified = true;
          //this.verificationMessage = res.message;
          this.infoModal = {
            show: true,
            title: "User Verification Status",
            infoModalType: "userVerified",
            message: res.message,
            actions: "redirect"
          };
        },
        error: (err:any) => {
          this.isUserVerified = false;
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
    })
 }

 closeInfoModal(data:any){
  //console.log("closeInfoModal",data);
  this.infoModal = {show : false};
}
}