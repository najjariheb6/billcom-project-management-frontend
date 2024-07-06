import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { DayOff } from "../model/dayoff";
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
  export class DayoffService 
  {
    constructor(private httpClient: HttpClient) { }
    private refresh = new Subject<void>();
  
    get refreshNeeded() 
    {
      return this.refresh;
    }

    saveDayOff(dayoffDto: DayOff, formData: FormData): Observable<HttpEvent<string[]>> 
    {
        formData.append('dayoffDto', JSON.stringify(dayoffDto))
        return this.httpClient.post<string[]>(environment.urlConfig + `dayoff/savedayoff/`, formData, {
          reportProgress: true,
          observe: 'events'
        }).pipe(
          tap(() => {
            this.refresh.next();
          })
        );
    
      }





  }