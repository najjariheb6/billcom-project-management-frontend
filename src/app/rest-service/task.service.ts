import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task } from '../model/task';
import { Status } from '../model/status';
import { map, tap } from 'rxjs/operators';
import { TaskDetail } from '../model/taskDetail';
import { Comment } from '../model/comment';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient) { }
  private refresh$ = new Subject<void>();
  private refresh = new Subject<void>();

 /** Refresh for task */
 get refreshNeeded() {
    return this.refresh$;
  }
   /** Refresh for task Detail */
  get refreshdetail() {
    return this.refresh;
  }
  
  public listTasksByTeamMember(idTeamMember: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.urlConfig + `task/getTasksMember/${idTeamMember}`);
  }
  public listTasksByTeam(idTeam: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.urlConfig + `task/getTasksTeam/${idTeam}`);
  }

  taskGroupsSubject = new Subject<any[]>();
  public save(task: Task): Observable<any> {
    return this.httpClient
      .post<any>(environment.urlConfig + `task/createTask`, task)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );

  }

  emitTaskGroups() {
    this.taskGroupsSubject.next();
  }
  public update(idTask: any, data: any): Observable<any> {
    return this.httpClient.put(environment.urlConfig + `task/updateStatusTask/${idTask}`, data).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  public findAllStatus(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(environment.urlConfig + `task/findAllStatus`);
  }
  public getTasksCompletedDetails(idTeamMember: number): Observable<TaskDetail> {
    return this.httpClient.get<TaskDetail>(environment.urlConfig + `task/getTasksCompleted/${idTeamMember}`);
  }
/********************************************   Task detail Page       *****************************************************/
  public getTaskDetail(idTask: number): Observable<Task> {
    return this.httpClient.get<Task>(environment.urlConfig + `task/getTaskDetails/${idTask}`)
  }
  public deleteTask(idTask: number): Observable<Task[]> {
    return this.httpClient.delete<any>(environment.urlConfig + `task/deleteTask/${idTask}`).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  public addCommentToTask(idTask: number, comment: Comment): Observable<Comment> {
    return this.httpClient
      .post<Comment>(environment.urlConfig + `task/addCommentToTask/${idTask}`, comment)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );

  }

  public deleteComment(idComment: number): Observable<any> {
    return this.httpClient.delete<any>(environment.urlConfig + `task/deleteComment/${idComment}`).pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }
  public getComment(idcomment: number): Observable<Comment> {
    return this.httpClient.get<Comment>(environment.urlConfig + `task/getComment/${idcomment}`);
  }
  public setCommentOfTask(idComment: number, comment: Comment): Observable<any> {
    return this.httpClient.put(environment.urlConfig + `task/setCommentOfTask/${idComment}`, comment).
      pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }
  public getTasksBeetweenDates(idTask: number, startedDate: string,finalDate:string): Observable<any> {
    return this.httpClient.get<any>(environment.urlConfig + `task/getTaskEnterDate/${idTask}`, { params:{startedDate:startedDate , finalDate:finalDate}});
  }
  // define function to upload files
  upload(idTask: number, formData: FormData): Observable<HttpEvent<string[]>> {
    return this.httpClient.post<string[]>(environment.urlConfig + `task/uploadFiles/${idTask}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap(() => {
        this.refresh.next();
      })
    );

  }
  // define function to download files
 
  download(filename: string | undefined): Observable<Blob> {
    return this.httpClient.get(environment.urlConfig + `task/download/${filename}/`, {
      responseType: 'blob'
    });
  }
  public teamMembersTaskTwoDate(idTeamMember: number, startedDate: string,finalDate:string): Observable<any> {
    return this.httpClient.get<any>(environment.urlConfig + `task/getTeamMembersTasksTwoDate/${idTeamMember}`, { params:{startedDate:startedDate , finalDate:finalDate}});
  }
  public setDueDate(idTask: number, dueDate: Date): Observable<any> {
    return this.httpClient.put(environment.urlConfig + `task/setDueDate/${idTask}`, dueDate)
  }

  public addStatus(status: string): Observable<any> {
    return this.httpClient.post(environment.urlConfig + `task/addStatus`, status) 
  }



  public getTeamSpecefic(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.urlConfig + `team/getTeamSpecefic/${id}`);
  }



}
