import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatMessageDto } from '../model/chatMessageDto';

@Injectable({
  providedIn: 'root'
})



export class WebSocketNotificationService {
  webSocket: WebSocket;








  public openWebSocket() {
    this.webSocket = new WebSocket(environment.wbsNotif);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };



    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);

    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {

    this.webSocket.send(JSON.stringify(chatMessageDto));

  }


  public closeWebSocket() {
    this.webSocket.close();
  }

}