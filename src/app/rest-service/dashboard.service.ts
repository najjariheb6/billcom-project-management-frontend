import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CountTaskTeamMember, ApiDetail, TaskStatistic, TypePercentage } from "../model/task";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: HttpClient) { }
  private refresh = new Subject<void>();

  get refreshNeeded() {
    return this.refresh;
  }
 
  countTaskDelayed(idTeamMember: number): Observable<TaskStatistic>{
    return this.httpClient.get<TaskStatistic>(environment.urlConfig + `test/countTaskMemberDelayed/${idTeamMember}`)  
}

  
  getTypePercentageCount(idTeam: number): Observable<CountTaskTeamMember[]>{
    return this.httpClient.get<CountTaskTeamMember[]>(environment.urlConfig + `test/countTaskTeamMemberDto/${idTeam}`)

  }
  countKpiTeam(idTeam: number): Observable<TypePercentage[]>{
    return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `test/countKpiTeam/${idTeam}`);

  }
  countKPIweek(idTeam: number): Observable<ApiDetail[]>{
    return this.httpClient.get<ApiDetail[]>(environment.urlConfig  + `test/countKPIweek/${idTeam}`);

  }
  MonthStatistic(idTeam: number,month:any,year:any): Observable<any>{
    return this.httpClient.get<any>(environment.urlConfig  + `test/countKPIMonth/${idTeam}`, { params:{month:month , year:year}});

  }
  teamKpiLeader(): Observable<any>{
    return this.httpClient.get<any>(environment.urlConfig  + `test/KpiTeamLeader`);

  }
}
