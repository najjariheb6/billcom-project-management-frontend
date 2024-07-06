import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { DialogConfigModalComponent } from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import { Employee } from 'src/app/model/employee';
import { Team } from 'src/app/model/team';
import { AuthService } from 'src/app/rest-service/auth.service';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { EventService } from 'src/app/rest-service/event.service';
import { TeamService } from 'src/app/rest-service/team.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { UpdateEventComponent } from '../update-event/update-event.component';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent implements OnInit {

  eventList: Event[] = []
  team: Team
  employee: Employee
  options: any;
  event: any = null
  id: any
  shown: boolean = false
  calendarOptions: CalendarOptions
  constructor(public authService: AuthService, private employeeService: EmployeeServiceService, public router: Router, private teamService: TeamService, private route: ActivatedRoute, public eventSevice: EventService, private modalComponent: DialogConfigModalComponent) { }

  ngOnInit(): void {
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))
    this.getTeamDetail()

    this.eventSevice.refreshNeeded.subscribe(() => {
      this.getListEvent();

    }
    )


    this.getListEvent();

  }
  getListEvent() {
    //let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))
    this.eventSevice.liste(this.id).subscribe(
      (events: Event[]) => {
        this.eventList = events;

        this.calendarOptions = {
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
          },
          weekends: false,
          eventBackgroundColor: "#f88538",
          eventBorderColor: "#f88538",
          editable: true,
          height: 700,
          eventDrop: this.eventDragStopClick.bind(this),
          eventClick: this.clickEvent.bind(this),
          droppable: true,
          events: this.eventList
        };


      },
      err => {
        console.log(err)
      }


    );

  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  goToAddEvent() {
    // let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))
    this.modalComponent.implementDialogConfig(this.id, AddEventComponent, '700px', '400px')
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.event.start)
  }

  eventDragStopClick(arg) {
    // let id = this.route.snapshot.params.id;

    this.eventSevice.update(this.id, arg.event).subscribe();
  }
  clickEvent(arg) {
    this.event = arg.event
    if (this.event != null) {
      // let id = this.route.snapshot.params.id;
      this.modalComponent.implementTask(this.id, this.event, DetailEventComponent, '580px', '380px')
    }


  }

  getTeamDetail() {
    // let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))
    this.getUser()
    this.teamService.detail(this.id).subscribe(
      data => {
        this.team = data;
        if (this.employee.user_id == this.team.leader.user.user_id) {
          this.shown = true;
        }
      }, err => {
        console.log(err)

      });
  }

  redirectTeamLeadToTeam() {
    //let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    let id = decode.substring(0, decode.indexOf("/"))
    id = encodeURIComponent(id + "/")

    this.router.navigateByUrl("home/teamDetail/" + id)
  }
  getUser() {
    this.employeeService.getlogged().subscribe(
      (data: Employee) => {

        this.employee = data;

      },
      err => {
        console.log(err)
      }
    );
  }




}


