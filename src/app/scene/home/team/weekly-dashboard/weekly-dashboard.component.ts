import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiDetail } from 'src/app/model/task';
import { Team } from 'src/app/model/team';
import { DashboardService } from 'src/app/rest-service/dashboard.service';
import { DashboardInteractionService } from 'src/app/shared/service/dashboard-interaction.service';

@Component({
  selector: 'app-weekly-dashboard',
  templateUrl: './weekly-dashboard.component.html',
  styleUrls: ['./weekly-dashboard.component.scss']
})
export class WeeklyDashboardComponent implements OnInit {

  @Input()
  team: Team
  statWeekList: ApiDetail[] = []
  view: any[] = [700, 300];

  // options
  legendTitle: string = 'weeks';
  legendTitleMulti: string = 'status';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'status';
  xAxisLabel: string = 'weeks';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;


  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme = {
    domain: ['#f68059', '#ffbf3a', '#1CD4AF', '#BD4F00', '#CA0B00']
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['week 1']
  barPadding: number = 8
  tooltipDisabled: boolean = false;


  roundEdges: boolean = false;
  DashboardForm: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService,private dashboardInteractionService: DashboardInteractionService) { }

  ngOnInit(): void {
    this.dashboardService.countKPIweek(this.team.id).subscribe((data: ApiDetail[]) => {
      this.statWeekList = data;




    })
    this.dashboardInteractionService.taskInteractionValue$.subscribe(
      value => { 
       

        this.dashboardService.countKPIweek(this.team.id).subscribe((data: ApiDetail[]) => {
          this.statWeekList = data;
    
    
    
    
        })
      
    
      }
    )




    this.DashboardForm = this.formBuilder.group({
      weekDate: ['', Validators.required]



    });
  }
  get f() { return this.DashboardForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.DashboardForm.invalid) {
      return;
    } else {

      moment(this.DashboardForm.value.weekDate).format("MMM");
      moment(this.DashboardForm.value.weekDate).format("AAAA");


      this.dashboardService.MonthStatistic(this.team.id, moment(this.DashboardForm.value.weekDate).format("MMMM"), moment(this.DashboardForm.value.weekDate).format("YYYY")).subscribe((data: ApiDetail[]) => {
        this.statWeekList = data;



      })

    }



  }
}
