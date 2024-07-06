import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Employee } from 'src/app/model/employee';
import { Task } from 'src/app/model/task';
import { UserLoggedInteractionService } from 'src/app/shared/service/user-logged-interaction.service';

@Component({
  selector: 'app-task-date-list',
  templateUrl: './task-date-list.component.html',
  styleUrls: ['./task-date-list.component.scss']
})
export class TaskDateListComponent implements OnInit {
  nbDone : number = 0 ;
  user : Employee
  constructor( private interactionService: UserLoggedInteractionService, @Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<TaskDateListComponent>) { }

  ngOnInit(): void {

    this.data.forEach((task: Task) => {
        if (task.status.statusDescritpion === 'done') {
          this.nbDone = this.nbDone + 1}
      
      })

      this.interactionService.userLogged$.subscribe(

        employee => {
            this.user = employee;
          }
  
        );


  }

  close() {
    this.dialogRef.close()
  }
  formatDate(d: Date) {
    return moment(d).format('DD MMMM,YY h:mm a')
  }
}
