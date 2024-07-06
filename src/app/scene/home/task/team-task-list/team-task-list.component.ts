import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/model/status';
import { Task } from 'src/app/model/task';
import { AuthService } from 'src/app/rest-service/auth.service';
import { TaskService } from 'src/app/rest-service/task.service';
import { DialogconfirmService } from 'src/app/shared/service/dialogconfirm.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-team-task-list',
  templateUrl: './team-task-list.component.html',
  styleUrls: ['./team-task-list.component.scss']
})
export class TeamTaskListComponent implements OnInit {

  taskGroups: any[];
  tasks: Task[] = [];
  taskGroupsSubscription: Subscription;
  submitted = false;
  commentForm: FormGroup;
  hostPhoto: String = environment.urlConfig  + `photoUser/`
  stateGroup: Status[] = [];

  isCollapsed: boolean = true;
  test: String;
  showStatuVariable:boolean = false;
  id: number
  showForm: boolean = false
  team: any
  showTeamDetail : boolean = false
  constructor(public authService: AuthService, private formBuilder: FormBuilder, private dialogService: DialogconfirmService,public dialogRef: MatDialogRef<TeamTaskListComponent>
    ,private tasksService: TaskService,  public router: Router,private route: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
   

    this.tasksService.refreshNeeded.subscribe(() => {
      this.getListTask();
    }
    )
    this.commentForm = this.formBuilder.group({
      id: [0],
      content: ['', Validators.required]

    }

    );

this.getListTask()
this.getStatusList()
  }
  getListTask() {

    this.taskGroupsSubscription = this.tasksService.listTasksByTeam(this.data).subscribe(
      (data) => {
        this.tasks = data;
      }
    );
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
 /* ngOnDestroy() {
    this.taskGroupsSubscription.unsubscribe();
  }*/

  showTeam(){
    this.showTeamDetail = !this.showTeamDetail
  }

  update(id:number, status:string){
    this.showStatuVariable = !this.showStatuVariable;

    this.tasksService.update(id, status).subscribe();

  }
  goToTaskDetail(uri : any){
    
    let id = encodeURIComponent(uri + "/" + this.route.snapshot.params.id)

    //  this.router.navigateByUrl("home/task-detail/" + id + "/" + idTasks + "/" + idTeam + "/" + idProject)
    this.router.navigateByUrl("home/task-detail/" + id)

  }







 
 /* addTask() {
    let id = this.route.snapshot.params.id;

    this.modalComponent.implementDialogConfig(id, CreateTaskComponent, '1200px', '750px');


  }*/

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




  redirectToTeam() {
    // let id = this.route.snapshot.params.idTeam;

    let id = this.route.snapshot.params.idTeam;
    let idProject = this.route.snapshot.params.idProject
    this.router.navigateByUrl("/home/teamDetail/" + id + "/" + idProject)

  }
  redirectToTaskMemberDetail(id: number) {
    let idTasks = this.route.snapshot.params.id;
    let idTeam = this.route.snapshot.params.idTeam;

    this.router.navigateByUrl("/home/task-detail/" + id + "/" + idTasks + "/" + idTeam)


  }



  close(){
    this.dialogRef.close()


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


}



