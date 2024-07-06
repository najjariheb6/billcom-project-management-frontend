import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  id: number;
  submitted:boolean=false;
  employee: Employee;

  constructor(private route: ActivatedRoute,private router: Router,private employeeService : EmployeeServiceService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.detail(this.id)
      .subscribe(data => {
        this.employee = data;
      }, error => console.log(error));
  }

  updateEmployee() {
    this.employeeService.update(this.id, this.employee)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }

  onSubmit() {
    this.updateEmployee();    
    this.submitted = true;

  }

  gotoList() {
    this.router.navigate(['/home/employees']);
  }
}
