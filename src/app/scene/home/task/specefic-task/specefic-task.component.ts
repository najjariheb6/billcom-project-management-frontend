import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dateValidator, dueDateValidator } from 'src/app/commun-shared/validators/date-validator';
import { Status } from 'src/app/model/status';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/rest-service/task.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';

@Component({
  selector: 'app-specefic-task',
  templateUrl: './specefic-task.component.html',
  styleUrls: ['./specefic-task.component.scss']
})
export class SpeceficTaskComponent implements OnInit {
  addTaskForm: FormGroup
  stateGroup: Status[] = [];
  submitted = false;
  state: string
  constructor(private taskService: TaskService, public dialogRef: MatDialogRef<SpeceficTaskComponent>, private notifService: NotficationService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.state = this.data.taskType
    this.addTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      startedDate: ['', [Validators.required,dateValidator]],
      deleveryDate: ['', [Validators.required,dueDateValidator,dateValidator]],
      priority: ['', Validators.required],
      descriptionTask: [''],

    },  {
      validator: [dateValidator('deleveryDate'),dueDateValidator('startedDate','deleveryDate'),
      dateValidator('startedDate')]
    }

    );
    this.getList();
  }
  getList(): void {
    this.taskService.findAllStatus().subscribe(
      (data: Status[]) => {

        this.stateGroup = data;
      },
      err => {
        console.log(err)
      }


    );
  }
  get f() { return this.addTaskForm.controls; }
  onReset() {
    this.addTaskForm.reset()
  }
  close(){
    this.dialogRef.close()
  }
  onSubmit() {
    this.submitted = true;
    if (this.addTaskForm.invalid) {
      return;
    } else {
    
      const task = new Task(
        this.addTaskForm.value.deleveryDate,
        this.addTaskForm.value.startedDate,
        this.addTaskForm.value.descriptionTask,
        this.data.id,
        this.addTaskForm.value.priority,
        this.data.taskType,
        this.addTaskForm.value.taskName,


      )
      this.taskService.save(task).subscribe(
        data => {

          this.notifService.showSuccess("Task is created", "Done!");
          this.dialogRef.close()

        },
        err => {

          console.log('error');

        }
      );




    }

  }
}
