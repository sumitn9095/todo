import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { UrlConstants } from '../utility/UrlConstants';
import { CommonConstants } from '../utility/CommonConstants';
@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  user : any;
  public uri: string = environment.app_url;
  public header = new HttpHeaders();
  constructor(private _http : HttpClient) {
    this.user = CommonConstants.getUser();
  }

  fetch_all(){
    let obj = {
      email : this.user.email
    }
    return this._http.post<any>(`${this.uri}${UrlConstants.userHobbies}`,obj);
  }

  hobby_add(obj:any) {
    obj.email = this.user.email
    return this._http.post<any>(`${this.uri}${UrlConstants.userHobbyAdd}`, obj);
  }

  hobby_remove(id:any) {
    let obj = {
      id: id
    }
    return this._http.post<any>(`${this.uri}${UrlConstants.userHobbyRemove}`, obj);
  }
}
