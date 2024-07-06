import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Team } from 'src/app/model/team';

import { TeamService } from 'src/app/rest-service/team.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.scss']
})
export class MemberHomeComponent implements OnInit {

  teams: Team[] = [];

  hostPhoto: String = environment.urlConfig + `photoUser/`


  constructor(private teamService: TeamService, private router: Router) { }

  ngOnInit(): void {

    this.getTeamList()
  }

  getTeamList(): void {
    this.teamService.teamOfTeamMember().subscribe(
      (data: Team[]) => {

        this.teams = data;
      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );

  }

  goToTask(id: number, idTeam: number) {
    let idTask =encodeURIComponent(id + "/" + idTeam + "/" );
    this.router.navigateByUrl("home/task/" + idTask)
  }
  goToCalendar(uri: number) {
    let id =encodeURIComponent(uri +  "/" );
    this.router.navigateByUrl("home/calendar/" + id)

  }

  goToRoom(uri: number) {
    let id =encodeURIComponent(uri +  "/" );
    this.router.navigateByUrl("home/chat/" + id)

  }


}