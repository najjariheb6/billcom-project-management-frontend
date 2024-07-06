import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/rest-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) { }
  canActivate(): boolean {
    if (this._auth.loggedIn() ) {
      return true
    } else {
      this._router.navigate(['/login'])
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
  canActivateLeaderHome(): boolean {
    if (this._auth.isLeader()) {
      return true
    } else {
      this._router.navigate(['/login'])
    }
  }

}
