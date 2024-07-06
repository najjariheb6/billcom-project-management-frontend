import { Component, Input, OnInit } from '@angular/core';
import { TypePercentage } from 'src/app/model/task';
import { Team } from 'src/app/model/team';
import { DashboardService } from 'src/app/rest-service/dashboard.service';
import { TeamDashboardComponent } from '../team-dashboard/team-dashboard.component';
import { DashboardInteractionService } from 'src/app/shared/service/dashboard-interaction.service';

@Component({
  selector: 'app-daily-dashboard',
  templateUrl: './daily-dashboard.component.html',
  styleUrls: ['./daily-dashboard.component.scss']
})
export class DailyDashboardComponent implements OnInit {

  @Input()
  teamDashboardChild : Team;
  labels : string []
  data : number []
  today: number = Date.now();

  TypePercentages : TypePercentage[] = [] 
  
  view: any[] = [400, 300];
  legend: boolean = true;
  schemeType: string = "ordinal"
  legendPosition: string = 'below';
  colorScheme = {
   domain: ['#f68059', '#ffbf3a','#1CD4AF', '#BD4F00', '#CA0B00']

};
  constructor( private dashboardInteractionService: DashboardInteractionService,private dashboardService : DashboardService, private dashbpardComponent:TeamDashboardComponent) { }

  ngOnInit(): void {
    this.dashboardService.countKpiTeam(this.teamDashboardChild.id).subscribe((data:TypePercentage[] )=>
    {
      this.TypePercentages = data;
      }
    )
  
    this.dashboardInteractionService.taskInteractionValue$.subscribe(
      value => { 
       
        this.dashboardService.countKpiTeam(this.teamDashboardChild.id).subscribe((data:TypePercentage[] )=>
        {
          this.TypePercentages = data;
          }
        )    
      
    
      }
    )


    
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  convert(){
    this.dashbpardComponent.convertToPDF()
  }

}

 
 

  



