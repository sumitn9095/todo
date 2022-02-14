import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpClient,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  public uri: any = environment.app_url;
  public s = new Subject<string>();
  public bs = new BehaviorSubject<string>('');
  public rs = new ReplaySubject<string>();
  constructor(private _http: HttpClient) {}
  testmock() {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    let req = new HttpRequest('GET', `${this.uri}/users`, {
      headers: headers,
    });
    return this._http.request(req);
  }

  getSingleUser(user_id: number): Observable<any> {
    return this._http.get<any>(`${this.uri}/user/${user_id}`);
  }

  testDetails(user_id: number) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    let req = new HttpRequest('GET', `${this.uri}/details/${user_id}`);
  }

  rsOutput() {
    this.rs.next('Hey');
    this.rs.next('I');
    this.rs.next('am');
    this.rs.next('Sumit');
  }
}
