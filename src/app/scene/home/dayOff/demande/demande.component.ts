import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
//import { line } from 'd3-shape';
// import { readlink } from 'fs';
import { environment } from 'src/environments/environment';
import { Employee, User } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { DayoffService } from 'src/app/rest-service/dayoff.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {


  employees: Employee[] = [];
  employee: Employee = null

  form: FormData;
  leadProject: boolean;

  dayoffForm: FormGroup
  submitted = false;
  isChecked;
  isCheckedName;
  constructor(private employeeService: EmployeeServiceService, private dayoffService: DayoffService) { }
  hostPhoto: String = environment.urlConfig + `photoUser/`
  ngOnInit(): void {
    // Initialize dayoffForm here
    this.dayoffForm = new FormGroup({
      name: new FormControl(''),
      startedDate: new FormControl(''),
      endDate: new FormControl(''),
      description: new FormControl('')
      // Add more FormControls as per your form structure
    });

    // Optional: You may want to fetch data or perform other initialization here
    this.getListProjectManager();
  }

  onChange(e) {

    if (this.isChecked === true) {
      this.isCheckedName = undefined;
      this.isChecked = !this.isChecked;
    }
    else {
      this.isCheckedName = e.target.employee.user_id;
      this.isChecked = !this.isChecked;
    }
  }

  get f() { return this.dayoffForm.controls; }


  // close() 
  // {

  //   readlink("/member/user-profil");
  //   RouterLink="['/member/user-profil']";
  //   [RouterLink]="['/member/user-profil']" 
  // }
  getListProjectManager() {
    this.employeeService.listeProjectManagerEmployee().subscribe(
      (data: Employee[]) => {

        this.employees = data;
      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getListProjectManager();
    }
  }

  onUploadFiles(files: File[]): void {
    this.form = null
    let formData = new FormData()
    for (const file of files) { formData.append('files', file, file.name); }
    this.form = formData
  }

  onSubmit() {

    const user = new User(
      this.employee.firstName,
      this.employee.lastName,
      this.employee.mobile,
      this.employee.email,
      this.employee.adresse,
      this.employee.passportNumber,
      this.employee.passeportValidityDate,
      this.employee.visaValidateDate
    )



    this.submitted = true;
    this.dayoffForm.value
    if (this.isCheckedName === undefined) {
      this.leadProject = true
    } else {
      this.leadProject = false

    }
    if (this.dayoffForm.invalid || this.isCheckedName === undefined) {
      return;

    }
    else {
      this.dayoffForm.value.idProjectLeader = this.isCheckedName
      this.dayoffService.saveDayOff(this.dayoffForm.value, this.form).subscribe(data => {


        //this.webNotifSocket.sendMessage(new ChatMessageDto(1,1,"from project","test"));
        //this.notifInteraction.sendValue(true);
        //this.notifyService.showSuccess("Project is Added Successfully","ok!")
        // this.dialogRef.close();

      },
        err => {
          console.log(err)
          //alert(err.message)          
        })
    }
  }
}
