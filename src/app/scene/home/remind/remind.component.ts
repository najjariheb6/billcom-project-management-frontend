import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/rest-service/notification.service';
import { Notification } from 'src/app/model/notification';
import * as moment from 'moment';

@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss']
})
export class RemindComponent implements OnInit {
  reminds: Notification[] = []
  today: number = Date.now();

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getList()
  }



  getList() {
    this.notificationService.getNotifRemember().subscribe(
      (data: Notification[]) => {
        this.reminds = data;


  });}
  formatDate(d: Date) {
    return moment(d).format('  h:mm a ')
  }


}
