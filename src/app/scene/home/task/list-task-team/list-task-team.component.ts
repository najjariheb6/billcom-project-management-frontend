import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { TaskService } from 'src/app/rest-service/task.service';

@Component({
  selector: 'app-list-task-team',
  templateUrl: './list-task-team.component.html',
  styleUrls: ['./list-task-team.component.scss']
})
export class ListTaskTeamComponent implements OnInit {
  nbDone : number = 0 ;
  user : Employee = null;
  shown : boolean = false;
  changeDateForm: FormGroup

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeServiceService, private taskService:TaskService,@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<any>) { }


  ngOnInit(): void {

    this.employeeService.getlogged().subscribe(
      (data: Employee) => {

        this.user = data;
      },
      err => {
        console.log(err)
      }
    );





    this.changeDateForm = this.formBuilder.group({
      deleveryDate: ['',Validators.required],

    }

    );

    
    


}

close() {
  this.dialogRef.close()
}
formatDate(d: Date) {
  return moment(d).format('DD MMMM,YY h:mm a')
}
show(){
  this.shown = !this.shown
}

onSubmit(id:number){
this.taskService.setDueDate(id, this.changeDateForm.value.deleveryDate).subscribe();

}
}
