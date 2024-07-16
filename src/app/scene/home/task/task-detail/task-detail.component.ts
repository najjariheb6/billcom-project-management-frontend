import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Comment } from 'src/app/model/comment';
import { Employee } from 'src/app/model/employee';
import { Task } from 'src/app/model/task';
import { CommentService } from 'src/app/rest-service/comment.service';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { TaskService } from 'src/app/rest-service/task.service';
import { saveAs } from 'file-saver-es';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/rest-service/auth.service';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Task = null;
  // hostPhoto: string = 'http://localhost:8080/photoUser/'
  hostPhoto: string = environment.urlConfig + `photoUser/`;

  commentForm: FormGroup;
  updateForm: FormGroup;
  comment: Comment
  comments: Comment[] = []
  employee: Employee = null
  submitted = false;
  commentId: any;
  update: boolean = false
  showMe: boolean = true
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  content: string
  id: any
  fileVisible: boolean = true;
  constructor(public authService: AuthService, private formBuilder: FormBuilder, public router: Router, private employeeService: EmployeeServiceService, private commmentService: CommentService, private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.commentForm = this.formBuilder.group({
      id: [0],
      content: ['', Validators.required]

    }

    );
    this.updateForm = this.formBuilder.group({
      content: ['', Validators.required]

    }

    );
    let decode = decodeURIComponent(this.route.snapshot.params.id)

    this.id = decode.substring(0, decode.indexOf("/"))

    this.taskService.refreshdetail.subscribe(() => {
      let decode = decodeURIComponent(this.route.snapshot.params.id)
      this.id = decode.substring(0, decode.indexOf("/"))
      this.getTaskDetails(this.id);

    }
    );
    this.getTaskDetails(this.id);
    this.getUser()
    this.getAllComment()

  }
  get f() { return this.commentForm.controls; }

  onSubmit(id: number) {

    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    } else {
      if (!this.update) {
        const comment = new Comment(
          this.commentForm.value.content,
          this.employee)
        //  let taskId = this.route.snapshot.params.id;
        this.taskService.addCommentToTask(this.id, comment).subscribe(
          data => {
            this.commentForm.reset()
            this.showMe = !this.showMe
            this.getAllComment()


          },
          err => {

            console.log('error');

          }
        );


      } else {
        if (this.update) {
          this.update = false
          const comment = new Comment(
            this.commentForm.value.content,

            this.employee)

          this.taskService.setCommentOfTask(this.commentId, comment).subscribe(
            data => {
              this.commentForm.reset()

            },
            err => {

              console.log('error');

            }
          );


        }
      }
    }


  }
  reset() {
    this.commentForm.reset();
    this.commentForm.controls.id.setValue(1)
  }

  getAllComment() {
    //  let id = this.route.snapshot.params.id;

 
    this.commmentService.getTasksComment(this.id).subscribe((data: Comment[]) => {
      this.comments = data
    }
    );
  }
  edit(id) {

    this.commentId = id;
    this.update = true

    if (this.showMe == false) {
      this.showMe = true
    }
    if (id) {

      const comment = this.comments.find(x => x.id === id);
      comment.isReading = true;
      if (!comment) return;
      this.taskService.getComment(id).subscribe((result) => {
        Object.keys(this.commentForm.controls).forEach(key => {
          this.commentForm.controls[key].setValue(result[key]);
        });
        comment.isReading = false;

      })
    }
  }



  getTaskDetails(id: number) {
    this.taskService.getTaskDetail(id).subscribe(data => {
      this.task = data;
    }
    );
  }

  formatDate(d: Date) {
    return moment(d).format('DD MMMM,  ')
  }
  formathoure(d: Date) {
    return moment(d).format('hh:mm a')
  }
  getsize(c: Comment[]) {

    return c.length

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
  deleteComment(id: number) {
    this.taskService.deleteComment(id).subscribe();
  }
  ShowAddComment() {
    this.commentForm.reset()
    this.updateForm.reset()
    this.update = false

    this.showMe = !this.showMe
  }



  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }
    //let id = this.route.snapshot.params.id;

    this.taskService.upload(this.id, formData).subscribe(
      event => {
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // define a function to download files
 
  onDownloadFile(filename: string): void {
    this.taskService
      .download(filename)
      .subscribe(blob => saveAs(blob, filename));
  }
  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');

        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvnt.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('Fiele-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }
  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  showAadFile() {
    this.fileVisible = !this.fileVisible
  }
  redirectToTask() {
    //let id = this.route.snapshot.params.idTasks;
    //let idTeam = this.route.snapshot.params.idTeam;
    //let idProject = this.route.snapshot.params.idProject;
    //this.router.navigateByUrl("home/task/" + id + "/" +idTeam)

    let decode = decodeURIComponent(this.route.snapshot.params.id)
    let id = decode.substring(decode.indexOf("/")+ 1)
    id = id.substring(0, id.indexOf("/"))

    let idTeam = decode.substring(decode.indexOf("/") +1)
    idTeam = idTeam.substring(idTeam.indexOf("/") +1)
    idTeam = idTeam.substring(0, idTeam.indexOf("/"))
   
    let idProject = decode.substring(decode.indexOf("/") +1)
    idProject = idProject.substring(idProject.indexOf("/") +1)
    idProject = idProject.substring(idProject.indexOf("/") +1)
    
    this.id = encodeURIComponent(id + "/" + idTeam + "/" + idProject +"/")
    //    this.router.navigateByUrl("home/task/" + id + "/" +idTeam+ "/" +idProject)
    this.router.navigateByUrl("home/task/" + this.id)


  }
  redirectToTasksMember() {
    //let id = this.route.snapshot.params.idTasks;
    //let idTeam = this.route.snapshot.params.idTeam;

    let decode = decodeURIComponent(this.route.snapshot.params.id)
  
    let id = decode.substring(decode.indexOf("/")+ 1)
    id = id.substring(0, id.indexOf("/"))
  
    let idTeam = decode.substring(decode.indexOf("/") +1)
    idTeam = idTeam.substring(idTeam.indexOf("/") +1)
 
    this.id = encodeURIComponent(id + "/" + idTeam)
    //this.router.navigateByUrl("home/test/" + id )
    this.router.navigateByUrl("home/task/" + this.id)

  }

}
