import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/model/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }
  private refresh = new Subject<void>();

  get refreshNeeded() {
    return this.refresh;
  }

  public liste(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(environment.urlConfig + `notification/NotificationList`);
  }
  public getNotifRemember(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(environment.urlConfig + `notification/getNotifRemember`);
  }
  public updateStatus(id: number, data: any): Observable<any> {
    return this.httpClient.put(environment.urlConfig + `notification/updateNotificationStatus/${id}`, data).pipe(
      tap(() => { this.refresh.next(); }));
  }
  public updateallNotificationStatus(): Observable<any> {
    return this.httpClient.get(environment.urlConfig + `notification/updateallNotificationStatus`).pipe(
      tap(() => {
        this.refresh.next();
      }));
  }
  public deleteNotification(id: number): Observable<any> {
    return this.httpClient.delete(environment.urlConfig + `notification/deleteNotification/${id}`).pipe(
      tap(() => {
        this.refresh.next();
      }));
  }
}
