import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PasswordUpdate } from '../model/passwordUpdate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: Array<any>=[];
  jwtToken = null;


  constructor(private http: HttpClient, private _router: Router) { }


 
  /**
   * 
   * @param user 
   * @returns cette methode permet d'authentifier le user 
   */

  login(user) {
   // return this.http.post(environment.urlConfig + `login`, user, { observe: 'response' });
    return this.http.post(environment.urlLogin, user, { observe: 'response' });

  }



  SaveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwtToken= jwt;
    let jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }


  loggedIn() {
    return !!localStorage.getItem('token')
  }
  logout() {
    localStorage.removeItem('token')
    window.location.reload()
    this._router.navigate(['/login'])
  
  }
  getToken() {
    return localStorage.getItem('token')
  }
  sendEmail(email: string): Observable<any> {
    return this.http.post<any>(environment.urlConfig  + "login/sendEmail", email);

  }

  checkcode(code: string): Observable<any> {
    return this.http.post<any>(environment.urlConfig + "login/check", code);

  }

  updateResetPossword(code: string, password: string): Observable<any> {
    return this.http.post<any>(environment.urlConfig  + "login/reset" + `/${code}`, password);

  }
  updatePasswordAttemptFirstLogin(model:PasswordUpdate): Observable<PasswordUpdate> {
    return this.http.post<PasswordUpdate>(environment.urlConfig + "login/updateFirstLogin" ,  model);

  }
  getRolesDecode(){
    this.jwtToken = localStorage.getItem('token');
    let jwtHelper = new JwtHelperService();
     return this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }
  isFirstAttemptUser(email : string) : Observable<any>{
    return this.http.get<any>(environment.urlConfig  + "login/checkAttemptFirst" + `/${email}`);
  }
  isManager() {
    this.getRolesDecode()
    for (let r of this.roles) {
      if (r.authority=='manager') return true;
    } 
     return false;
  }
  isLeader() {
    this.getRolesDecode()
    for (let r of this.roles) {
      if (r.authority=='leader') return true;
    } 
     return false;
  }
  isMember() {
    this.getRolesDecode()

    for (let r of this.roles) {
      if (r.authority=='member') return true;
    } 
     return false;
  }
  isProjectLeader() {
    this.getRolesDecode()

    for (let r of this.roles) {
      if (r.authority=='project leader') return true;
    } 
     return false;
  }

}
