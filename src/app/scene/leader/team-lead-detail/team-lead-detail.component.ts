import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberInput } from 'ng-zorro-antd/core/types';
import { Employee } from 'src/app/model/employee';
import { Member } from 'src/app/model/member';
import { TaskDetail } from 'src/app/model/taskDetail';

import { Team } from 'src/app/model/team';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { TaskService } from 'src/app/rest-service/task.service';
import { TeamService } from 'src/app/rest-service/team.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-team-lead-detail',
  templateUrl: './team-lead-detail.component.html',
  styleUrls: ['./team-lead-detail.component.scss']
})
export class TeamLeadDetailComponent implements OnInit {

  team: Team = null;
  members: Member[] = [];
  taskDetail: TaskDetail = null;
  employees: Employee[] = [];
  //hostPhoto: String = 'http://localhost:8080/photoUser/'
  hostPhoto: String = environment.urlConfig  + `photoUser/`

  nb: number = 0
  memberForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private teamService: TeamService, private route: ActivatedRoute, private employeeService: EmployeeServiceService, public router: Router) { }
  ngOnInit(): void {

    this.memberForm = this.formBuilder.group({

      idmembers: ['']
    },

    );

    let id = this.route.snapshot.params.id;
    this.teamService.detail(id).subscribe(
      data => {
        this.team = data;
        this.getTeamMember(data.id)
      }, err => {
        console.log(err)

      });
    this.teamService.refreshNeeded.subscribe(() => {
      this.getTeamMember(id);
    }
    )
  }
  get f() { return this.memberForm.controls; }

  getTeamMember(nb: number) {
    this.teamService.getTeamMember(nb).subscribe(data => {
      this.members = data;
    })
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
  addMemberToTeam(id: number) {
    this.teamService.addMemberToTeam(id, this.memberForm.value.idmembers).subscribe(
      data => {
        console.log(data)
      }
    )

  }
  deleteMemberFromTeam(list: any) {
    var bumber: any[] = [list]

    this.teamService.deleteMemberFromTeam(this.route.snapshot.params.id, bumber).subscribe(() => {

    }, err => {
      console.log(err)
    }
    );

  }
  goToTask(id: number) {
    this.router.navigateByUrl("home/test/" + id)
  }
  goToTeamDashboard(id : number){
    this.router.navigateByUrl("home/teamDetail/" + id)

  }



}