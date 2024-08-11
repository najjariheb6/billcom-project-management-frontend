import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { Team } from 'src/app/model/team'
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { AuthService } from 'src/app/rest-service/auth.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import { ProjectService } from 'src/app/rest-service/project.service';
import { dateControl, endTeamDateControl } from 'src/app/commun-shared/validators/date-validator';
import { Skill } from 'src/app/model/skill';
import { NotifInteractionService } from 'src/app/shared/service/notif-interaction.service';
import { environment } from 'src/environments/environment';
import { WebSocketNotificationService } from 'src/app/rest-service/web-socket-notification.service';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  titleTeam: String = ' Add Team';

  employees: Employee[] = [];
  emp: Employee
  registerForm: FormGroup;
  submitted = false;
  dropdownSettings;
  skill:String
  showSkill:boolean =false
  showemp:boolean = false
  showSkillValue :boolean =  false
  hostPhoto: String = environment.urlConfig  + `photoUser/`
  constructor(public webNotifSocket :WebSocketNotificationService,private formBuilder: FormBuilder, private notifyService: NotficationService, public auth: AuthService, private projectService: ProjectService, public employeeService: EmployeeServiceService,
    private router: Router,private notifInteraction : NotifInteractionService, public dialogRef: MatDialogRef<AddTeamComponent>, @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      teamName: ['', Validators.required],
      startedDate: ['', [Validators.required,dateControl]],
      dueDate : ['', [Validators.required,endTeamDateControl]],
      idLeader: ['', Validators.required],
      idmembers: ['', Validators.required],
    }, {
      
        validator:[ dateControl('startedDate', this.data.project.startedDate, this.data.project.endDate),
        endTeamDateControl(  'startedDate',     'dueDate',  this.data.project.startedDate,this.data.project.endDate)]
  


    }

    );
    this.getUser();
  }

  get f() { return this.registerForm.controls; }
  getUser() {
    this.employeeService.getlogged().subscribe(
      (data: Employee) => {

        this.emp = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  onSubmit() {

    this.submitted = true;
    if (this.registerForm.invalid  ) {
      return;
    }
    if (this.auth.isManager() || this.auth.isProjectLeader()) {
      const team = new Team(
        this.registerForm.value.teamName,
        this.registerForm.value.idmembers,
        this.registerForm.value.idLeader)
      this.projectService.saveTeamIntoProject(this.data.project.id, this.registerForm.value).subscribe(
        data => {

          this.notifyService.showSuccess("congratulations", "Team is created");

          this.onReset();
          this.close()
       //   this.webNotifSocket.sendMessage(new ChatMessageDto(1,1,"this.eventForm.value.title","test"));


        },
        err => {

          console.log('error');

        }
      );
    }
   /* else {

      const team = new Team(
        this.registerForm.value.teamName,
        this.registerForm.value.idmembers,
        this.emp.id)
      this.projectService.saveTeamIntoProject(this.data, team).subscribe(
        data => {

          this.notifyService.showSuccess("congratulations", "Team is created");

          this.onReset();
          this.close()
        },
        err => {
          this.registerForm.value.teamName.reset()
          console.log('error');

        });
    }


*/

  }
  getListMember() {
    this.employeeService.listeMemberEmployee().subscribe(
      (data: Employee[]) => {

        this.employees = data;

      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );
  }
  getListLeader() {
    this.employeeService.listeLeaderEmployee().subscribe(
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
      this.getListLeader();
    }
  }
  public searchMembers(key: string): void {
    const result: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(employee);
      }
    }
    this.showSkillValue = false
    this.employees = result;
    if (result.length === 0 || !key) {
      this.getListMember();
    }
  }
  onReset() {
    this.registerForm.reset();
  }
 
  formSkill(){
    this.showemp = false
    this.showSkill = true
  }
  
  formEmp(){
    this.showSkill = false

    this.showemp = true
  }
  public searchBySkill(): void {
    const results: Employee[] = [];

    for (const employee of this.employees) {
      employee.skills.forEach((type1: Skill) => {

        if (type1.roleLabel.toLowerCase().indexOf(this.skill.toLowerCase()) !== -1)
         {
                results.push(employee);
              
            }
      })
    }

    this.employees = results;
    this.showSkillValue = true
    if (results.length === 0 || !this.skill || this.skill=="") {
      this.skill = ""
      this.getListMember();
    }
  }
  close() {
    this.dialogRef.close();
  }

}
