import { Component, Inject, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/model/status';
import { Task, TeamTask } from 'src/app/model/task';
import { TaskService } from 'src/app/rest-service/task.service';
import { dateValidator, dueDateValidator } from 'src/app/commun-shared/validators/date-validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import { ActivatedRoute } from '@angular/router';
import { DialogConfigModalComponent } from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import { Employee } from 'src/app/model/employee';
import { ListTaskTeamComponent } from '../list-task-team/list-task-team.component';
import { TeamService } from 'src/app/rest-service/team.service';
import { Member } from 'src/app/model/member';
import { DashboardInteractionService } from 'src/app/shared/service/dashboard-interaction.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  @Output() refreshEmitter = new EventEmitter<boolean>();
  constructor(private teamService: TeamService,private dashboardInteractionService: DashboardInteractionService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CreateTaskComponent>, private modalComponent: DialogConfigModalComponent, private notifService: NotficationService, private taskService: TaskService,  private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data) { }
  addTaskForm: FormGroup
  submitted = false;
  stateGroup: Status[] = [];
  teamTask: TeamTask[] = [];
  user : Employee
  members: Member[] = [];
  showForm: boolean = false
  statusForm: FormGroup;


  ngOnInit(): void {

    this.addTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      startedDate: ['', [Validators.required, dateValidator]],
      deleveryDate: ['', [Validators.required, dueDateValidator, dateValidator]],
      priority: ['', Validators.required],
      idMember: ['',Validators.required],
      idStatus: ['',Validators.required],
      descriptionTask: [''],

    }, {
      validator: [dateValidator('deleveryDate'), dueDateValidator('startedDate', 'deleveryDate'),
      dateValidator('startedDate')]
    }

    );
    this.statusForm = this.formBuilder.group({
      status: ['', Validators.required],

    }

    );
    this.getList()

 this. getTeamMember();




  }

  getTeamMember(){
    this.teamService.getTeamMember(this.data).subscribe(data =>{
      this.members= data;
    })
  }

  get f() { return this.addTaskForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.addTaskForm.invalid) {
      return;
    }

    else {

      this.getListTaksPeriod()
    }



  }

  getList(): void {
    this.taskService.findAllStatus().subscribe(
      (data: Status[]) => {

        this.stateGroup = data;
      },
      err => {
        console.log(err)
        //alert(err.message)
      }


    );
  }
  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log(event)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event)
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);


    }
  }
  dragEnd($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());

  }
  onReset() {
    this.addTaskForm.reset();
  }
  close() {
    this.dialogRef.close()
    this.refreshEmitter.emit(true)
  }

  getListTaksPeriod() {
    this.taskService.teamMembersTaskTwoDate(this.addTaskForm.value.idMember, this.addTaskForm.value.startedDate, this.addTaskForm.value.deleveryDate).subscribe(
      data => {
        this.teamTask = data;

        if (this.teamTask.length == 0) {

        const task = new Task(
          this.addTaskForm.value.deleveryDate,
          this.addTaskForm.value.startedDate,
          this.addTaskForm.value.descriptionTask,
          this.addTaskForm.value.idMember,
          this.addTaskForm.value.priority,
          this.addTaskForm.value.idStatus,
          this.addTaskForm.value.taskName


        )
        this.taskService.save(task).subscribe(
          data => {
            this.notifService.showSuccess("Task is created", "Done!");

            //this.onReset()
            this.dashboardInteractionService.sendValue(true);
            this.dialogRef.close()
          },
          err => {

            console.log('error');

          }
        );










      }
        else {
          this.modalComponent.implementTaskList(this.teamTask, ListTaskTeamComponent, '1000px', '800px');

        }










      }

    );
  }

  showFormStatus() {
    this.showForm = !this.showForm
  }






}
