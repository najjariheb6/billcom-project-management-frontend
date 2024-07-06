import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifInteractionService {

private _notifInteractionValue = new Subject<boolean>();

notifInteractionValue$ = this._notifInteractionValue.asObservable();
constructor(){}
sendValue(value : boolean){
  this._notifInteractionValue.next(value);
}


}
