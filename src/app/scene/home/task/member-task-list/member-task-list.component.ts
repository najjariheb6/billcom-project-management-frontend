import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DialogConfigModalComponent } from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import { Employee } from 'src/app/model/employee';
import { Status } from 'src/app/model/status';
import { Task } from 'src/app/model/task';
import { AuthService } from 'src/app/rest-service/auth.service';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { TaskService } from 'src/app/rest-service/task.service';
import { TeamService } from 'src/app/rest-service/team.service';
import { DialogconfirmService } from 'src/app/shared/service/dialogconfirm.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { SpeceficTaskComponent } from '../specefic-task/specefic-task.component';

@Component({
  selector: 'app-member-task-list',
  templateUrl: './member-task-list.component.html',
  styleUrls: ['./member-task-list.component.scss']
})
export class MemberTaskListComponent implements OnInit {

  taskGroups: any[];
  tasks: Task[] = [];
  employee: Employee = null
  taskGroupsSubscription: Subscription;
  submitted = false;
  commentForm: FormGroup;
  statusForm: FormGroup;
  project: any
  isCollapsed: boolean = true;
  test: String;
  showStatuVariable: boolean = false;
  id: any
  stateGroup: Status[] = [];
  showForm: boolean = false
  team: any
  showTeamDetail: boolean = false
  constructor(private employeeService: EmployeeServiceService, public authService: AuthService, public teamService: TeamService, private formBuilder: FormBuilder, private modalComponent: DialogConfigModalComponent, private dialogService: DialogconfirmService,
    private tasksService: TaskService, private route: ActivatedRoute, public router: Router
  ) { }

  ngOnInit() {
    this.statusForm = this.formBuilder.group({
      status: ['', Validators.required],

    }

    );

    this.tasksService.refreshNeeded.subscribe(() => {
      this.getListTask();
    }
    )
    this.commentForm = this.formBuilder.group({
      id: [0],
      content: ['', Validators.required]

    }

    );



    this.getListTask();
    this.getStatusList();
    this.getTeamDetail()

    this.getProjectDetail();
  }
  getListTask() {
    //  let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))
    this.taskGroupsSubscription = this.tasksService.listTasksByTeamMember(this.id).subscribe(
      (data) => {
        this.tasks = data;
      }
    );
  }

  getProjectDetail() {
    // let id = this.route.snapshot.params.idTeam;
    let decode = decodeURIComponent(this.route.snapshot.params.id)
    let idTeamIdProject = decode.substring(decode.indexOf("/") + 1)
    this.id = idTeamIdProject.substring(0, idTeamIdProject.indexOf("/"))

    this.teamService.projectTeamDetail(this.id).subscribe(
      data => {
        this.project = data;

      }, err => {
        console.log(err)

      });
  }
  showStatus() {
    this.showStatuVariable = !this.showStatuVariable;
  }

  get f() { return this.commentForm.controls; }

  addComment(id: number) {

    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    } else {



      this.tasksService.addCommentToTask(id, this.commentForm.value).subscribe(
        data => {
          this.commentForm.reset()



        },
        err => {

          console.log('error');

        }
      );




    }


  }




  onTaskDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      var b = event.currentIndex;
      const id = event.container.data[event.currentIndex]?.id
      this.tasksService.update(id, event.container.id).subscribe();
    }

  }
  ngOnDestroy() {
    this.taskGroupsSubscription.unsubscribe();
  }

  showTeam() {
    this.showTeamDetail = !this.showTeamDetail
  }

  update(id: number, status: string) {
    this.showStatuVariable = !this.showStatuVariable;

    this.tasksService.update(id, status).subscribe();

  }



  onSubmit() {
    this.tasksService.addStatus(this.statusForm.value.status
    ).subscribe(
      data => {

        this.statusForm.reset();
        this.getStatusList()
        this.showForm = !this.showForm
      },
      err => {

        console.log(err);

      }
    );




  }




  showFormStatus() {
    this.showForm = !this.showForm
  }
  addTask() {
    // let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))
    this.modalComponent.implementDialogConfig(this.id, CreateTaskComponent, '1200px', '750px');


  }

  deleteTask(id: number) {
    this.dialogService.openConfirmDialog('Are you sure ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.tasksService.deleteTask(id).subscribe();
          // this.notfService.showSuccess("Task Is deleted", "ok")
        }
      })
  }




  formatDate(d: Date) {
    return moment(d).format('DD MMMM,YY h:mm a')
  }

  show(taskStatus: string) {
    // let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))

    this.modalComponent.implementTask(this.id, taskStatus, SpeceficTaskComponent, '710px', '550px');

  }
  goToTaskDetail(uri: number) {
    //let idTasks = this.route.snapshot.params.id;
    // let idTeam = this.route.snapshot.params.idTeam;
    //let idProject = this.route.snapshot.params.idProject;
    //   this.id =    encodeURIComponent(idTeamIdProject + "/");

    let id = encodeURIComponent(uri + "/" + this.route.snapshot.params.id)

    //  this.router.navigateByUrl("home/task-detail/" + id + "/" + idTasks + "/" + idTeam + "/" + idProject)
    this.router.navigateByUrl("home/task-detail/" + id)

  }
  getTeamDetail() {
    //let id = this.route.snapshot.params.idTeam;
    let decode = decodeURIComponent(this.route.snapshot.params.id)
    let idTeamIdProject = decode.substring(decode.indexOf("/") + 1)
    this.id = idTeamIdProject.substring(0, idTeamIdProject.indexOf("/"))

    this.tasksService.getTeamSpecefic(this.id).subscribe(
      (data) => {
        this.team = data;
      }
    );
  }

  getStatusList(): void {
    this.tasksService.findAllStatus().subscribe(
      (data: Status[]) => {

        this.stateGroup = data;
      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );
  }



  redirectToTeam() {
    // let id = this.route.snapshot.params.idTeam;
    let decode = decodeURIComponent(this.route.snapshot.params.id)
    let idTeamIdProject = decode.substring(decode.indexOf("/") + 1)
    // let id = this.route.snapshot.params.idTeam;
    //let idProject = this.route.snapshot.params.idProject
    this.id = encodeURIComponent(idTeamIdProject + "/");
    this.router.navigateByUrl("/home/teamDetail/" + this.id)

  }
  redirectToTaskMemberDetail(uri: number) {
    let decode = decodeURIComponent(this.route.snapshot.params.id)
    //   let idTasks = this.route.snapshot.params.id;
    //let idTeam = this.route.snapshot.params.idTeam;
    let idTasks = decode.substring(0, decode.indexOf("/"))
    let idTeam = decode.substring(decode.indexOf("/") + 1)
    let id = encodeURIComponent(uri + "/" + idTasks + "/" + idTeam + "/")
  //  this.router.navigateByUrl("/home/task-detail/" + uri + "/" + idTasks + "/" + idTeam)
  this.router.navigateByUrl("/home/task-detail/" + id)

  }
}



