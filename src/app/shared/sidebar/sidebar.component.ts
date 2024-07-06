import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { AuthService } from 'src/app/rest-service/auth.service';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { NotificationService } from 'src/app/rest-service/notification.service';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/model/notification';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
employee:Employee = null
reminds: Notification[] = []

remind:number
  constructor(public auth:AuthService,public employeeService:EmployeeServiceService,private notificationService: NotificationService ) { }
  hostPhoto: String = environment.urlConfig  + `photoUser/`

  ngOnInit(): void {
 
      this.employeeService.getlogged().subscribe(
        (data: Employee) => {
  
          this.employee = data;
  
        },
        err => {
          console.log(err)
        }
      );
    
     this.getList()
  }
  getList() {
    this.notificationService.getNotifRemember().subscribe(
      (data: Notification[]) => {
        this.reminds = data;


  });}

}
