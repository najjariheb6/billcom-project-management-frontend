import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatMessageDto } from '../model/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketChatService {
  webSocket: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor(private httpClient: HttpClient) { }
  private refresh = new Subject<void>();

  public getChatList(id: number): Observable<ChatMessageDto[]> {
    return this.httpClient.get<ChatMessageDto[]>(environment.urlConfig + `team/getChatList/${id}`)
  }
  get refreshdetail() {
    return this.refresh;
  }
 



}
