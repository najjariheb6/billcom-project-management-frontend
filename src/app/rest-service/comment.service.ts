import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/comment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
 // host = 'http://localhost:8080/task'

  constructor(private httpClient: HttpClient) { }

  private refresh = new Subject<void>();


  get refreshNeeded() {
    return this.refresh;
  }

  public addCommentToTask( idTask : number, comment: Comment): Observable<Comment> {
    return this.httpClient
      .post<Comment>(environment.urlConfig + `task/addCommentToTask/${idTask}`, comment)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );

  }
  public getTasksComment(idTask: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(environment.urlConfig+ `task/getTasksComment/${idTask}`);
  }
  public setCommentOfTask(idComment: number, comment: Comment): Observable<any> {
    return this.httpClient.put(environment.urlConfig + `task/setCommentOfTask/${idComment}`, comment);
  }

  public deleteComment(idComment: number): Observable<any> {
    return this.httpClient.delete<any>(environment.urlConfig + `task/deleteComment/${idComment}`).pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }
}
