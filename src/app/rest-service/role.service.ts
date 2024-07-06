import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Role } from '../model/role';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }
  private refresh = new Subject<void>();


  get refreshNeeded() {
    return this.refresh;
  }
  public liste(id: number): Observable<Role[]> {
    return this.httpClient.get<Role[]>(environment.urlConfig + `role/getList/${id}`);
  }
  // public liste(): Observable<Role[]> {
  //   return this.httpClient.get<Role[]>(environment.urlConfig + `role/getList`);
  // }
 

  public delete(id: any, data: any): Observable<any> {
    return this.httpClient.put(environment.urlConfig + `role/deleteRoleFromUser/${id}`, data).pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }
  
  public addUserAccessRole(id: any, data: any): Observable<any> {
    return this.httpClient
      .put(environment.urlConfig + `role/addUserAccessRole/${id}`, data)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

   getRoleList():Observable<Role[]>{

    return this.httpClient.get<Role[]>(environment.urlConfig + `role/getList`);
  }



}
