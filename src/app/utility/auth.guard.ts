import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _cs : CommonService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("AuthGuard");
    let token = sessionStorage.getItem("todo_token");
    let user = sessionStorage.getItem("user");
    if((!token || token === '') || (!user) ) {
      this._cs.openSnackBar("You need to Login first, to access Dashboard.", "Error");
      return false;
    };
    return true;
  }
}
