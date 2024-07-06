import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Employee } from 'src/app/model/employee';
import { Role } from 'src/app/model/role';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  hostPhoto: String = environment.urlConfig  + `photoUser/`;

  employee: Employee = null;

  constructor(private router: Router, private route: ActivatedRoute, public dialogRef: MatDialogRef<EmployeeDetailComponent>, private employeeService: EmployeeServiceService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.employeeService.detail(this.data).subscribe(
      data => {
        this.employee = data;
        console.log('from employee detail', this.employee);
      }, err => {
        console.log(err);

      });
  }
  GoBack(): void {
    this.router.navigate(['/home/employee']);
  }

  getRole(l: Role[]) {

    return l.map(({ name }) => ` ${name}`).join(' & ');
  }


  getEmployeeName(employee: Employee) {
    return ('' + employee.firstName + '  ' + employee.lastName);

  }
  formatDate(d: Date) {
    return moment(d).format('DD-MM-YYYY');
  }
  close(){
    this.dialogRef.close();
  }
}
