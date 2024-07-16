import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private refresh = new Subject<void>();

    //  host = 'http://localhost:8080/event/'
    constructor(private httpClient: HttpClient) {
    }

    get refreshNeeded() {
        return this.refresh;
    }

    public liste(idTeam: number): Observable<any> {
        return this.httpClient.get<any>(environment.urlConfig + `event/eventTeamList/${idTeam}`);
    }

    public save(idTeam: number, event: Event): Observable<Event> {
        return this.httpClient
            .put<Event>(environment.urlConfig + `event/addEventToList/${idTeam}`, event)
            .pipe(tap(() => {
                this.refresh.next();
            }));


    }

    public update(idTeam: number, event: any): Observable<any> {
        return this.httpClient
            .put<any>(environment.urlConfig + `event/updateEvent/${idTeam}`, event)
            .pipe(tap(() => {
                this.refresh.next();
            }));
    }

    public updateDetailEvent(idTeam: number, event: any): Observable<any> {
        return this.httpClient
            .put<any>(environment.urlConfig + `event/updateDetailEvent/${idTeam}`, event)
            .pipe(tap(() => {
                this.refresh.next();
            }));
    }


    public detail(id: number): Observable<any> {
        return this.httpClient.get<any>(environment.urlConfig + `event/getEventDetail/${id}`);
    }

    public deleteEventFromList(idTeam: number, event: any): Observable<any> {
        return this.httpClient
            .put<any>(environment.urlConfig + `event/deleteEventFromList/${idTeam}`, event)
            .pipe(tap(() => {
                this.refresh.next();
            }));
    }


}
