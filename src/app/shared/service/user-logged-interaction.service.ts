import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from 'src/app/model/employee';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInteractionService {

  
  private userLogged = new Subject<Employee>()
  public userLogged$ = this.userLogged.asObservable();

  constructor() { }
  sendUserLogged(employee: Employee){
    this.userLogged.next(employee)
  }
}
