import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Team } from 'src/app/model/team';
import { WorkMemberService } from 'src/app/rest-service/work-member.service';

@Component({
  selector: 'app-work-member',
  templateUrl: './work-member.component.html',
  styleUrls: ['./work-member.component.scss']
})
export class WorkMemberComponent implements OnInit {

  teams: Team[] = [];
  workDtoList: any = [];
  workDtoListCurrentDay: any = [];
  DashboardForm: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder, private workService: WorkMemberService) {
  }
  ngOnInit(): void {
    this.getTeamList()
    this.getWorkMemberList()
    this.DashboardForm = this.formBuilder.group({
      weekDate: ['', Validators.required]



    });
  }
  get f() { return this.DashboardForm.controls; }

  getTeamList(): void {
    this.workService.getteamList().subscribe(
      (data: Team[]) => {

        this.teams = data;
      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );

  }
  formatDate(d: Date) {
    return moment(d).format('DD/MM ')
  }
  getWorkMemberList(): void {
    this.workService.getWorkMemberList().subscribe(
      (data: any) => {

        this.workDtoList = data;



      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );




  }

  addHourToMemberWork(worknbHour, id: any) {

    this.workService.addHourToMemberWork(id, worknbHour).subscribe();
  }



  onSubmit() {

    this.submitted = true;
    if (this.DashboardForm.invalid) {
      return;
    } else {

      moment(this.DashboardForm.value.weekDate).format("MMM");
      moment(this.DashboardForm.value.weekDate).format("AAAA");
     
      this.workService.getteamListSearch(moment(this.DashboardForm.value.weekDate).format("MMMM"), moment(this.DashboardForm.value.weekDate).format("YYYY")).subscribe((data: any) => {
        this.teams = data;



      })

      this.workService.getWorkMemberListSearch(moment(this.DashboardForm.value.weekDate).format("MMMM"), moment(this.DashboardForm.value.weekDate).format("YYYY")).subscribe((data: any) => {
        this.workDtoList = data;



      })

    }


  }


}
