import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = sessionStorage.getItem('token');
    let tokenAuth;
    if(token !== ''){
      tokenAuth = request.clone({
        setHeaders : { Authorization: 'Bearer '+token }
      })
    } else {
      tokenAuth = request;
    }
    return next.handle(tokenAuth);
  }
}
