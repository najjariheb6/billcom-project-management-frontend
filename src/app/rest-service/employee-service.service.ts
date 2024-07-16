import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Employee, User} from '../model/employee';

import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeServiceService {

    // host = 'http://localhost:8080/user/'

    role: string;

    constructor(private httpClient: HttpClient) {
    }

    private refresh = new Subject<void>();

    get refreshNeeded() {
        return this.refresh;
    }

    public liste(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(environment.urlConfig + `user/all`);
    }

    public listeMemberEmployee(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(environment.urlConfig + 'user/ListMember');
    }

    public listeLeaderEmployee(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(environment.urlConfig + 'user/ListLeader');
    }

    public listeProjectManagerEmployee(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(environment.urlConfig + 'user/ListProjectLeader');
    }

    public saveWithoutPhoto(employee: Employee): Observable<any> {
        return this.httpClient
            .post<any>(environment.urlConfig + `user/createWithoutPhoto`, employee)
            .pipe(
                tap(() => {
                    this.refresh.next();
                })
            );
    }

    public save(employee: Employee, formData: FormData): Observable<HttpEvent<string[]>> {
        formData.append('userDto', JSON.stringify(employee));

        return this.httpClient
            .post<any>(environment.urlConfig + `user/create`, formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                tap(() => {
                    this.refresh.next();
                })
            );
    }


    saveRole(employee: Employee) {
        employee.roles.forEach((currentValue) => {
            return currentValue;

        });
    }

    public detail(idUser: number): Observable<Employee> {
        return this.httpClient.get<Employee>(environment.urlConfig + `user/details/${idUser}`);
    }


    public update(idUser: any, data: any): Observable<any> {
        return this.httpClient.put(environment.urlConfig + `user/update/${idUser}`, data).pipe(
            tap(() => {
                this.refresh.next();
            })
        );

    }

    public updateStatus(idUser: any, data: any): Observable<any> {
        return this.httpClient.put(environment.urlConfig + `user/updateStatus/${idUser}`, data).pipe(
            tap(() => {
                this.refresh.next();
            })
        );

    }

    uploadPhoto(file: File, idUser): Observable<HttpEvent<{}>> {
        let formdata: FormData = new FormData();
        formdata.append('file', file);
        const req = new HttpRequest('POST', environment.urlConfig + 'user/uploadPhoto/' + idUser, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.httpClient.request(req);
    }

    public getlogged(): Observable<Employee> {
        return this.httpClient.get<Employee>(environment.urlConfig + `user/loggedUser`);
    }

    public updateEmployee(idUser: number, employee: User): Observable<any> {
        return this.httpClient
            .put<any>(environment.urlConfig + `user/update/${idUser}`, employee)
            .pipe(
                tap(() => {
                    this.refresh.next();

                })
            );
    }

    public adSkillsToUser(idUser: number, skill: any): Observable<any> {
        return this.httpClient
            .put<any>(environment.urlConfig + `user/adSkillsToUser/${idUser}`, skill)
            .pipe(
                tap(() => {
                    this.refresh.next();

                })
            );
    }

// define function to upload files
    upload(idUser: number, formData: FormData): Observable<HttpEvent<string[]>> {
        return this.httpClient.post<string[]>(environment.urlConfig + `user/uploadFiles/${idUser}`, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            tap(() => {
                this.refresh.next();
            })
        );

    }

// define function to download files
    /*download(filename: string): Observable<HttpEvent<Blob>> {
      return this.httpClient.get(environment.urlConfig  + `user/download/${filename}/`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      });}*/

    download(filename: string | undefined): Observable<Blob> {
        return this.httpClient.get(environment.urlConfig + `user/download/${filename}/`, {
            responseType: 'blob'
        });
    }


    public deleteUser(idUser: any, data: any): Observable<any> {
        return this.httpClient.delete(environment.urlConfig + `user/delete/${idUser}`, data).pipe(
            tap(() => {
                this.refresh.next();
            })
        );

    }

}
