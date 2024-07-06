import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogConfigModalComponent } from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import { dueDateValidator } from 'src/app/commun-shared/validators/date-validator';
import { Member } from 'src/app/model/member';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/rest-service/task.service';
import { TaskDateListComponent } from '../task-date-list/task-date-list.component';

@Component({
  selector: 'app-task-date',
  templateUrl: './task-date.component.html',
  styleUrls: ['./task-date.component.scss']
})
export class TaskDateComponent implements OnInit {
  @Input()
  memberList: Member[] = [];
  DateForm: FormGroup
  submitted = false;
  taskList: Task[] = [];

  constructor(private formBuilder: FormBuilder,private taskService: TaskService,private modalComponent: DialogConfigModalComponent) { }

  ngOnInit(): void {
    this.DateForm = this.formBuilder.group({
      idMember: ['',Validators.required],
      startedDate: ['', Validators.required],
      finalDate: ['', [Validators.required,dueDateValidator]],


    }, {
      validator: dueDateValidator('startedDate','finalDate')
    }

    );
  }
  get f() { return this.DateForm.controls; }

onSubmit(){
  this.submitted = true;
  if (this.DateForm.invalid) {
      return;
  }else{
  this.taskService.getTasksBeetweenDates(this.DateForm.value.idMember,this.DateForm.value.startedDate,this.DateForm.value.finalDate).subscribe(
  data =>{
    this.taskList = data;
    this.submitted = false;
    this.modalComponent.implementTaskList( this.taskList,TaskDateListComponent, '1000px', '800px');
   this.DateForm.reset();
  }
  
    );
}}
}
