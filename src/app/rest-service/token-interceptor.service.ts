import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector, INJECTOR } from '@angular/core';
import {  AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}
  intercept(req, next){
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${authService.getToken()}`


      }})
     return next.handle(tokenizedReq)
  }
}
