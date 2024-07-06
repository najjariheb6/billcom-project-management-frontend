import { CdkObserveContent } from '@angular/cdk/observers';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { dateValidator, dueDateValidator } from 'src/app/commun-shared/validators/date-validator';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { ProjectService } from 'src/app/rest-service/project.service';
import { WebSocketNotificationService } from 'src/app/rest-service/web-socket-notification.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import { NotifInteractionService } from 'src/app/shared/service/notif-interaction.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  leadProject: boolean;

  projectForm: FormGroup
  employees: Employee[] = [];
  submitted = false;
  isChecked;
  isCheckedName;
  form: FormData
  hostPhoto: String = environment.urlConfig + `photoUser/`

  constructor(public webNotifSocket: WebSocketNotificationService, public dialogRef: MatDialogRef<AddProjectComponent>, private formBuilder: FormBuilder, private notifyService: NotficationService, private projectService: ProjectService, private employeeService: EmployeeServiceService) { }


  ngOnInit(): void {

    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      startedDate: ['', [Validators.required, dateValidator]],
      endDate: ['', [Validators.required, dueDateValidator]],
      description: [''],

    }, {
      validator: [dueDateValidator('startedDate', 'endDate'),
      dateValidator('startedDate')]


    },

    );
    this.webNotifSocket.openWebSocket();

    this.getListProjectManager();


  }

  close() {
    this.dialogRef.close();

  }

  get f() { return this.projectForm.controls; }
  onSubmit() {

    this.submitted = true;
    this.projectForm.value
    if (this.isCheckedName === undefined) {
      this.leadProject = true
    } else {
      this.leadProject = false

    }
    if (this.projectForm.invalid || this.isCheckedName === undefined) {
      return;

    } else {
      this.projectForm.value.idProjectLeader = this.isCheckedName
      this.projectService.saveProject(this.projectForm.value, this.form).subscribe(data => {

        //       this.webNotifSocket.sendMessage(new ChatMessageDto(1,1,"from project","test"));

        //       this.notifInteraction.sendValue(true);

        //this.notifyService.showSuccess("Project is Added Successfully","ok!")
        this.dialogRef.close();

      },
        err => {
          console.log(err)
          //alert(err.message)          
        })
    }
  }
  onUploadFiles(files: File[]): void {
    this.form = null
    let formData = new FormData()
    for (const file of files) { formData.append('files', file, file.name); }
    this.form = formData
  }
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
  onChange(e) {

    if (this.isChecked === true) {
      this.isCheckedName = undefined;
      this.isChecked = !this.isChecked;


    } else {
      this.isCheckedName = e.target.employee.user_id;
      this.isChecked = !this.isChecked;

    }


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
}

