import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {ChatMessageDto} from 'src/app/model/chatMessageDto';
import {Employee} from 'src/app/model/employee';
import {Member} from 'src/app/model/member';
import {AuthService} from 'src/app/rest-service/auth.service';
import {EmployeeServiceService} from 'src/app/rest-service/employee-service.service';
import {TeamService} from 'src/app/rest-service/team.service';
import {WebSocketChatService} from 'src/app/rest-service/web-socket-chat.service';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    employee: Employee = null;
    // hostPhoto: String = 'http://localhost:8081/photoUser/'
    hostPhoto: string = environment.urlConfig + `photoUser/`;
    today: number = Date.now();
    romms: number[] = [];
    chatMessages: ChatMessageDto[] = [];
    id: any;
    show = false;
    webSocket: WebSocket;

    constructor(public authService: AuthService, public router: Router, public webSocketService: WebSocketChatService, private teamService: TeamService, private employeeService: EmployeeServiceService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        //  this.webSocketService.openWebSocket();
        this.openWebSocket();
        this.getUser();
        this.createRoom();

        this.getList();
    }

    getList = () => {
        // let id = this.route.snapshot.params.id;
        const decode = decodeURIComponent(this.route.snapshot.params.id);

        this.id = decode.substring(0, decode.indexOf('/'));
        this.webSocketService.getChatList(this.id).subscribe(
            (data: ChatMessageDto[]) => {
                // this.webSocketService.chatMessages = data;
                this.chatMessages = data;
            });
    }

    formatDate = (d: Date) => moment(d).format('DD MMMM, hh:mm a ');

    addToRoom = () => {
        this.romms.forEach((nb: number) => {
            if (nb === this.employee.user_id) {
                this.show = true;
            }
        });
    }

    createRoom = () => {
        const id = this.route.snapshot.params.id;
        this.teamService.getTeamMemberDto(id).subscribe(data => {
            data.forEach((member: Member) => {
                this.romms.push(member.user.user_id);
            });
            this.teamService.detail(id).subscribe(
                data => {
                    this.romms.push(data.leader.user.user_id);
                }, err => {
                    console.log(err);
                });
        });
    }

    sendMessage = (sendForm: NgForm) => {
        //  let id = this.route.snapshot.params.id;
        const decode = decodeURIComponent(this.route.snapshot.params.id);
        this.id = decode.substring(0, decode.indexOf('/'));
        this.romms.forEach((nb: number) => {
            if (nb === this.employee.user_id) {
                const chatMessageDto = new ChatMessageDto(this.id,
                    this.employee.user_id, this.employee.firstName.concat(' ' + this.employee.lastName), sendForm.value.message);
                this.webSocket.send(JSON.stringify(chatMessageDto));
                sendForm.reset();
            }
        });
    }

    getUser = () => {
        this.employeeService.getlogged().subscribe(
            (data: Employee) => {
                this.employee = data;
            },
            err => {
                console.log(err);
            }
        );
    }

    goToTeamAsLeader = () => {
        const decode = decodeURIComponent(this.route.snapshot.params.id);
        let id = decode.substring(0, decode.indexOf('/'));
        id = encodeURIComponent(id + '/');
        this.router.navigateByUrl('home/teamDetail/' + id);
    }


  public openWebSocket = () => {
      this.webSocket = new WebSocket(environment.wbsConfig);
      this.webSocket.onopen = (event) => {
          this.getList();
      };

      this.webSocket.onmessage = (event) => {
          const chatMessageDto = JSON.parse(event.data);
          // this.chatMessages.push(chatMessageDto);
          this.getList();
      };

      this.webSocket.onclose = (event) => {
          console.log('Close: ', event);
          this.getList();
      };
  }

    public event = () => {
        this.webSocket.addEventListener = (event) => {
            const chatMessageDto = JSON.parse(event.data);
        };
    }


    /* public sendMessage(chatMessageDto: ChatMessageDto){

       this.webSocket.send(JSON.stringify(chatMessageDto));
     }*/


}
