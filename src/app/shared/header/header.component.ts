import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/rest-service/auth.service';
import { NotificationService } from 'src/app/rest-service/notification.service';
import { Notification } from 'src/app/model/notification';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';
import { ChatMessageDto } from 'src/app/model/chatMessageDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hostPhoto: String = environment.urlConfig  + `photoUser/`

  notifications: Notification[] = []
  shown: boolean = false
  notSeen:number = 0
  constructor( public _auth: AuthService, private notificationService: NotificationService) {
 

   }

  ngOnInit(): void {
    this.shown = false
   
    if(localStorage.getItem('token') != null){
  const obs$=interval(10000);
   obs$.subscribe(
    (d)=>{ this.getList();
   
    
    })
  }

    this.notificationService.refreshNeeded.subscribe(() => {
      this.getList();
}
    )


    this.openWebSocket(); 



    this.getList();
  }

  getList() {
    this.notificationService.liste().subscribe(
      (data: Notification[]) => {
        this.notifications = data;

        this.notSeen=0;
        data.forEach((notif: Notification) => {
          if (notif.seen == false) {
            this.notSeen = this.notSeen + 1
          }      },
      err => {
        console.log(err)
      }


    );
  });


}
  
  showNotif() {
    this.shown = !this.shown
    if(this.shown == true){
    this.notificationService.updateallNotificationStatus().subscribe();}
  }

formatDate(d: Date) {
    return moment(d).format('DD MMMM,YY  h:mm a ')
  }
updateSeenStatus(id:number,status:boolean){
  this.notificationService.updateStatus(id, status).subscribe(
  );
}
deleteNotificication(id:number){
  this.notificationService.deleteNotification(id).subscribe(

  );
}

webSocket: WebSocket;



  public openWebSocket(){
    this.webSocket = new WebSocket(environment.wbsNotif);
       
    this.webSocket.onopen = (event) => {
      this.getList()
    }; 

  

   this.webSocket.onmessage = (event) => {
     const chatMessageDto = JSON.parse(event.data);
     //this.chatMessages.push(chatMessageDto);
     
      this.getList()
    };

    this.webSocket.onclose = (event) => {
      this.getList()
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
   
    this.webSocket.send(JSON.stringify(chatMessageDto));
    this.getList() 




  }





  
}
