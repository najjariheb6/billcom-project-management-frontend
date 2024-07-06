import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/rest-service/dashboard.service';

@Component({
  selector: 'app-leader-dashboard',
  templateUrl: './leader-dashboard.component.html',
  styleUrls: ['./leader-dashboard.component.scss']
})
export class LeaderDashboardComponent implements OnInit {
  view: any[] = [420, 250];

  // options
  showLegend: boolean = false;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = false;

  legendPosition: string = 'linear';

  colorScheme = {
    domain: ['#f68059', '#ffbf3a','#1CD4AF', '#BD4F00', '#CA0B00']
  };


  

 listTeamKpi: any[]
  constructor(private dashboardService: DashboardService,private router: Router) { }

  ngOnInit(): void {
  this.getList()
  }
 getList(){
  this.dashboardService.teamKpiLeader().subscribe((data: any) => {
    this.listTeamKpi = data;




  })
 }
 goToTeamDetails(id: number) {
     
  this.router.navigateByUrl("home/teamDetail/" + id)
}


  public searchTeam(key: string): void {
    const results: any[] = [];
    for (const team of this.listTeamKpi) {
      if (team.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(team);
      }
    }
    this.listTeamKpi = results;
    if (results.length === 0 || !key) {
      this.getList();
    }
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
 

}
