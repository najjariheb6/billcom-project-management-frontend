import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../rest-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardEmployeeGuard implements CanActivate, CanActivateChild {
  constructor(private _auth: AuthService, private _router: Router) { }
  canActivate(): boolean {
    if (this._auth.isManager() ) {
      return true
    } else {
      return false
    }
  }
  canActivateChild(): boolean {
    if (this._auth.isManager() ) {
      return true
    } else {
      return false
    }
  }
  
}
