import { Injectable } from '@angular/core';
import { UrlConstants } from '../utility/UrlConstants';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public uri: string = environment.app_url;
  constructor(private _http : HttpClient, private _router:Router) { }
  signUp = (obj:{}) => {
    return this._http.post(`${this.uri}${UrlConstants.signup}`,obj);
  }
  signIn = (obj:{}) => {
    return this._http.post(`${this.uri}${UrlConstants.signin}`,obj);
  }
  signOut = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this._router.navigate(["../auth/signin"])
  }
}
