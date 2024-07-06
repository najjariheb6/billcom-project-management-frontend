import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class WorkMemberService {

  constructor(private httpClient: HttpClient) { }
  private refresh = new Subject<void>();

  get refreshNeeded() 
  {
    return this.refresh;
  }

  public getteamList(): Observable<Team[]> 
  {
    return this.httpClient.get<Team[]>(environment.urlConfig + `WorkMember/ListUserTeam`);
  }


  getteamListSearch(month:any,year:any): Observable<any>
  {
    return this.httpClient.get<any>(environment.urlConfig  + `WorkMember/ListUserTeamSearch`, { params:{month:month , year:year}});
  }



  public getWorkMemberList(): Observable<any> 
  {
    return this.httpClient.get<any>(environment.urlConfig + `WorkMember/getListWorkMember`);
  }
  
  getWorkMemberListSearch(month:any,year:any): Observable<any>
  {
    return this.httpClient.get<any>(environment.urlConfig  + `WorkMember/getListWorkMemberSearch`, { params:{month:month , year:year}});
  }

  addHourToMemberWork(idTeam: number,nbHour:any): Observable<any>
  {
    return this.httpClient.post<any>(environment.urlConfig  + `WorkMember/addHourToTeam/${idTeam}`,  nbHour);
  }

}
