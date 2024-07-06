import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/rest-service/notification.service';
import { Notification } from 'src/app/model/notification';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = []
  hostPhoto: String = environment.urlConfig  + `photoUser/`
  totalRecords:Number;
  page:Number=1
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {

    
    this.getList()  }
  getList() {
    this.notificationService.liste().subscribe(
      (data: Notification[]) => {
        this.notifications = data;
        this.totalRecords= data.length

  });}
  formatDate(d: Date) {
    return moment(d).format('DD MMMM,YY  h:mm a ')
  }

  public searNotificatios(key: string): void {
    const results: Notification[] = [];
    for (const notif of this.notifications) {
      if (notif.message.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || notif.subject.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(notif);
      }
    }
    this.notifications = results;
    if (results.length === 0 || !key) {
      this.getList();
    }
  }




}
