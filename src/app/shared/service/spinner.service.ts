import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
 
 private _loading = new BehaviorSubject<boolean> (false);
 public  readonly loading$ = this._loading.asObservable();
 constructor(){}

show(){
  this._loading.next(true);
}
hide(){
  this._loading.next(false);
}

} 
