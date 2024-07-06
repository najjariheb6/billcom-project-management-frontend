import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project, ProjectList } from '../model/project';
import { TypePercentage } from '../model/task';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }
  private refresh = new Subject<void>();

  get refreshNeeded() {
    return this.refresh;
  }
  public liste(): Observable<ProjectList[]> {
    return this.httpClient.get<ProjectList[]>(environment.urlConfig  + `project/listProject`);
  }
  public listProjectNotCompleted(): Observable<ProjectList[]> {
    return this.httpClient.get<ProjectList[]>(environment.urlConfig  + `project/listProjectNotCompleted`);
  }
  public listProjectLeaderNotCompleted(): Observable<ProjectList[]> {
    return this.httpClient.get<ProjectList[]>(environment.urlConfig  + `project/listProjectLeaderNotCompleted`);
  }
  public update(idProject: number, data: string): Observable<any> {
    return this.httpClient.put(environment.urlConfig  + `project/updateProjectStatus/${idProject}`, data)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );

  }
  saveProject(projectDto: Project, formData: FormData): Observable<HttpEvent<string[]>> {
    formData.append('projectDto', JSON.stringify(projectDto))
    return this.httpClient.post<string[]>(environment.urlConfig + `project/saveProject/`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap(() => {
        this.refresh.next();
      })
    );

  }

  public detail(idProject: number): Observable<ProjectList> {
    return this.httpClient.get<ProjectList>(environment.urlConfig + `project/getProjectDetail/${idProject}`);
  }
//save team into project

public saveTeamIntoProject(idProject:number , team: Team): Observable<Team[]> {
  return this.httpClient
    .put<any>(environment.urlConfig + `project/addTeamToProject/${idProject}`, team)
    .pipe(
      tap(() => {
        this.refresh.next();
      })
    );

}

upload(idProject: number, formData: FormData): Observable<HttpEvent<string[]>> {
  return this.httpClient.post<string[]>(environment.urlConfig  + `project/uploadFiles/${idProject}`, formData, {
  
    reportProgress: true,
    observe: 'events'
  }).pipe(
    tap(() => {
      this.refresh.next();
    })
  );

}

 // define function to download files
 /*download(filename: string): Observable<HttpEvent<Blob>> {
  return this.httpClient.get(environment.urlConfig + `project/download/${filename}/`, {
    reportProgress: true,
    observe: 'events',
    responseType: 'blob'
  });
}*/
download(filename: string | undefined): Observable<Blob> {
  return this.httpClient.get(environment.urlConfig + `project/download/${filename}/`, {
    responseType: 'blob'
  });
}
public deleteMemberFromTeam(idProject: number, idTeam: number): Observable<Team[]> {
  return this.httpClient
    .put<any>(environment.urlConfig + `project/deleteTeamFromProject/${idProject}`, idTeam)
    .pipe(
      tap(() => {
        this.refresh.next();
      })
    );

}
public updateProject(project: Project): Observable<any> {
  return this.httpClient
    .put<any>(environment.urlConfig + `project/updateProject`, project);

}

getProjectTimeGap(): Observable<TypePercentage[]>{
  return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `project/kpiGateProject`);

}
getProjectsProjectLeaderTimeGap(): Observable<TypePercentage[]>{
  return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `project/kpiGateProjectLeader`);

}
getProjectDealyedDelevered(): Observable<TypePercentage[]>{
  return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `project/kpiProjectDealyedDelevered`);

}
getProjectLeaderDealyedDelevered(): Observable<TypePercentage[]>{
  return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `project/kpiProjectLeaderDealyedDelevered`);

}
getProjectStatistic( id:number): Observable<TypePercentage[]>{
  return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `project/kpiProjectStatistic/${id}`);

}
getchargeAssismentProjetList( id:number): Observable<TypePercentage[]>{
  return this.httpClient.get<TypePercentage[]>(environment.urlConfig + `project/chargeAssismentProjet/${id}`);

}



public getListProjectProjectLeader(): Observable<ProjectList[]> {
  return this.httpClient.get<ProjectList[]>(environment.urlConfig+ `project/listProjectProjectLeader`);
}






}
