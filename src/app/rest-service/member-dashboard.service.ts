import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  DashboardMemberListDeatil, TypePercentage } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MemberDashboardService {

  constructor(private httpClient: HttpClient) { }
  kpiTeamofTeamMember(): Observable<DashboardMemberListDeatil[]>{
    return this.httpClient.get<DashboardMemberListDeatil[]>(environment.urlConfig + `memberDashboard/kpiTeamofTeamMember`);

  }

  kpiTeamofTeamMemberMonth(year:any): Observable<any>{
    return this.httpClient.get<any>(environment.urlConfig + `memberDashboard/kpiTeamofTeamMemberMonth`, { params:{ year:year}});

  }

  curretnkpiTeamMember(): Observable<any>{
    return this.httpClient.get<any>(environment.urlConfig + `memberDashboard/curretnkpiTeamMember`);

  }


  delayRateKpiTeamMember(): Observable<TypePercentage[]>{
    return this.httpClient.get<TypePercentage[]>(environment.urlConfig  + `memberDashboard/delayRateTeamofTeamMember`);

  }
}
