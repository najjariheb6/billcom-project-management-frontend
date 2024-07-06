import { Component, OnInit } from '@angular/core';
import { TypePercentage } from 'src/app/model/task';
import { TeamService } from 'src/app/rest-service/team.service';

@Component({
  selector: 'app-member-task-statistic',
  templateUrl: './member-task-statistic.component.html',
  styleUrls: ['./member-task-statistic.component.scss']
})
export class MemberTaskStatisticComponent implements OnInit {
  tasksdone: TypePercentage[] =[];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.taskDoneTeamMeber()
  }
  taskDoneTeamMeber(){
    this.teamService.taskDoneTeamMeber().subscribe(
      (data: TypePercentage[]) => {
        
        this.tasksdone= data ;
       },
        err => {
          console.log(err)
       
        }
  
      
    );
  }
}
