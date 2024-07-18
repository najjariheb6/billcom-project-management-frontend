import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import {DialogConfigModalComponent} from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import {ChatMessageDto} from 'src/app/model/chatMessageDto';
import {Employee} from 'src/app/model/employee';
import {Event} from 'src/app/model/event';
import {Team} from 'src/app/model/team';
import {EmployeeServiceService} from 'src/app/rest-service/employee-service.service';
import {EventService} from 'src/app/rest-service/event.service';
import {TeamService} from 'src/app/rest-service/team.service';
import {WebSocketNotificationService} from 'src/app/rest-service/web-socket-notification.service';
import {DialogconfirmService} from 'src/app/shared/service/dialogconfirm.service';
import {NotficationService} from 'src/app/shared/service/notfication.service';
import {UpdateEventComponent} from '../update-event/update-event.component';

@Component({
    selector: 'app-detail-event', templateUrl: './detail-event.component.html', styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {
    show: boolean = false;
    event: Event;
    ok: boolean = true;
    updateForm: boolean = true;
    team: Team;
    employee: Employee;
    shown: boolean = true;

    constructor(public webNotifSocket: WebSocketNotificationService, private employeeService: EmployeeServiceService, private teamService: TeamService, private eventService: EventService, @Inject(MAT_DIALOG_DATA) public data, private modalComponent: DialogConfigModalComponent, public dialogRef: MatDialogRef<any>, private notifyService: NotficationService, private dialogService: DialogconfirmService) {
    }

    ngOnInit(): void {
        this.getTeamDetail();

    }

    onSubmit() {


        this.eventService.updateDetailEvent(this.data.id, this.event).subscribe(res => {
            this.show = !this.show;
            this.notifyService.showSuccess('ok!', 'event Updated!');

            this.dialogRef.close();

        });
    }

    formatDate(d: Date) {
        return moment(d).format('DD MMMM, h:mm a');
    }

    deleteEvent() {
        this.dialogService.openConfirmDialog('Are you sure you want to cancel ' + this.data.taskType.title + ' event ?')
            .afterClosed().subscribe(res => {
            if (res) {
                this.eventService.deleteEventFromList(this.data.id, this.data.taskType).subscribe(() => {
                    this.notifyService.showSuccess('ok!', 'event canceled');
                    this.dialogRef.close();

                });
            }
        });
    }

    update() {
        //alert('date click! ' + arg.event.title)
        this.updateForm = !this.updateForm;

        this.eventService.detail(this.data.taskType.id).subscribe(eventData => {
            this.event = eventData;
            this.show = !this.show;

        }, err => {
            console.log(err);

        });


        //  this.modalComponent.implementDialogConfig(this.data,UpdateEventComponent, '550px', '250px')
    }

    getTeamDetail() {

        this.getUser();
        this.teamService.detail(this.data.id).subscribe(data => {
            this.team = data;
            if (this.employee.user_id == this.team.leader.user.user_id) {
                this.shown = true;
            }
        }, err => {
            console.log(err);

        });
    }


    getUser() {
        this.employeeService.getlogged().subscribe((data: Employee) => {

            this.employee = data;

        }, err => {
            console.log(err);
        });
    }


    close() {
    }
}
