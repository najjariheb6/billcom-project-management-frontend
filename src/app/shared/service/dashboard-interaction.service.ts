import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardInteractionService {

  private _taskInteractionValue = new Subject<boolean>();

  taskInteractionValue$ = this._taskInteractionValue.asObservable();
  constructor(){}
  sendValue(value : boolean){
    this._taskInteractionValue.next(value);
  }






}
