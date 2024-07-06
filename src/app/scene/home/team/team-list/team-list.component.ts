import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogConfigModalComponent } from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import { Employee } from 'src/app/model/employee';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/rest-service/team.service';
import { DialogconfirmService } from 'src/app/shared/service/dialogconfirm.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import { environment } from 'src/environments/environment';
import { AddTeamComponent } from '../add-team/add-team.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  hostPhoto: String = environment.urlConfig  + `photoUser/`

  teams: Team[] = [];
  employees: Employee[] = [];
  currentTime: any;
  number: number;

  constructor(public teamService: TeamService,private dialogConfirm: DialogconfirmService, private  notifyService : NotficationService,private modalComponent: DialogConfigModalComponent, private dialogService: DialogconfirmService, public router: Router, private dialog?: MatDialog) { }

  ngOnInit(): void {

    this.teamService.refreshNeeded.subscribe(() => {
      this.getTeamList();
    }
    )

    this.getTeamList();
  }

  getTeamList(): void {


    this.teamService.list().subscribe(
      (data: Team[]) => {

        this.teams = data;
      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );

  }

  goToAddTeam() {

    this.modalComponent.implement(AddTeamComponent, '400px', '700px')
  }
  goToTeamDetails(team: Team) {

    this.router.navigateByUrl("home/teamDetail/" + team.id)
  }
  deleteTeam(id: number) {
  if(this.teams.length > 0){
    this.dialogService.openConfirmDialog('This team has tasks, Are you sure you need to delete it?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.teamService.deleteTeam(id).subscribe(() => {
          this.notifyService.showSuccess("team is deleted!","ok")
          },
            err => {
              console.log(err)
              //alert(err.message)          
            }


          );
        }
      })


  }
}
public searchTeam(key: string): void {
  const results: Team[] = [];
  for (const team of this.teams) {
    if (team.teamName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || team.leader.user.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || team.leader.user.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ) {
      results.push(team);
    }
  }
  this.teams = results;
  if (results.length === 0 || !key) {
    this.getTeamList();
  }
} 
}






