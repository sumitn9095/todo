import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpClient,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  public uri: any = environment.app_url;
  constructor(private _http: HttpClient) {}

  testmock() {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    let req = new HttpRequest('GET', `${this.uri}/users`, {
      headers: headers,
    });
    return this._http.request(req);
  }
}
