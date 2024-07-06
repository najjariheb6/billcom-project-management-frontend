import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectInServiceService {
  private dataSource = new BehaviorSubject<string>('Default data');
  currentData = this.dataSource.asObservable();

  constructor() { }
  updateData(data:string){
    this.dataSource.next(data);
  }
}
