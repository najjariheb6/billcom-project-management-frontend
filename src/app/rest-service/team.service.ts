import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../model/member';
import { TypePercentage } from '../model/task';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private httpClient: HttpClient) { }
  private refresh = new Subject<void>();
  private refreshTeamDetail = new Subject<void>();

  get refreshNeeded() {
    return this.refresh;
  }
  get refreshDetail(){
    return this.refreshTeamDetail;

  }
  public list(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(environment.urlConfig + `team/getAllTeamList`);
  }

  public save(team: Team): Observable<Team[]> {
    return this.httpClient
      .post<any>(environment.urlConfig + `team/addTeam`, team)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );

  }
  public detail(idTeam: number): Observable<Team> {
    return this.httpClient.get<Team>(environment.urlConfig + `team/detailTeam/${idTeam}`)
  }

  public getTeamMember(idTeam: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(environment.urlConfig + `team/getTeamMember/${idTeam}`)
  }

  public addMemberToTeam(idTeam: number, list: number[]): Observable<Team[]> {
    return this.httpClient
      .put<any>(environment.urlConfig + `team/addMemberToTeam/${idTeam}`, list)
      .pipe(
        tap(() => {
          this.refreshTeamDetail.next();
        })
      );

  }
  
  public deleteMemberFromTeam(idTeam: number, list: Number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders(),
      body: list
    };
    return this.httpClient
      .delete<any>(environment.urlConfig + `team/deleteMemberFromTeam/${idTeam}`, options)
      .pipe(
        tap(() => {
          this.refreshTeamDetail.next();
        })
      );

  }
  public deleteTeam(idTeam: number): Observable<Team[]> {
    return this.httpClient.delete<any>(environment.urlConfig + `team/deleteTeam/${idTeam}`).pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }
  public teamListOfLeader(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(environment.urlConfig + `team/teamListOfLeader`);
  }
  public futureTeamListOfLeader(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(environment.urlConfig + `team/futureTeamListOfLeader`);
  }
  public passedTeamListOfLeader(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(environment.urlConfig + `team/passedTeamListOfLeader`);
  }

  public teamOfTeamMember(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(environment.urlConfig + `team/teamOfTeamMember`);
  }
  public taskDoneTeamMeber(): Observable<TypePercentage[]> {
    return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `team/taskDoneTeamMeber`);
  }

  public projectTeamDetail(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.urlConfig + `project/ProjectTeamDetail/${id}`);
  }



}
