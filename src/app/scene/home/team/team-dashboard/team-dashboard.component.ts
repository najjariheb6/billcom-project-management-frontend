import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { Member } from 'src/app/model/member';
import { CountTaskTeamMember, TaskDateStatusDto, TaskMemberStatistic, TaskStatistic, TypePercentage } from 'src/app/model/task';
import { Team } from 'src/app/model/team';
import { DashboardService } from 'src/app/rest-service/dashboard.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DashboardInteractionService } from 'src/app/shared/service/dashboard-interaction.service';
@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent implements OnInit {
  @Input()
  teamParent: Team;
  member: Member
  taskDateStatusDto: TaskDateStatusDto;
  tasksAdvanced: TaskDateStatusDto;

  taskMemberStatistic: TaskMemberStatistic[] = []
  taskStatistic: TaskStatistic = null
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'right',
    },
    cutoutPercentage: 50,
  };
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColor: Color[] = [
    { backgroundColor: ['#f68059', '#ffbf3a', '#1CD4AF', '#BD4F00', '#CA0B00'] },
  ];
  public typeData: Array<CountTaskTeamMember> = []
  shown: boolean = true
  statistic: boolean;
  constructor(private dashboardService: DashboardService, private dashboardInteractionService: DashboardInteractionService, public router: Router,) { }

  ngOnInit(): void {


    this.getAllCountTaskMember(this.teamParent.id);
    this.dashboardInteractionService.taskInteractionValue$.subscribe(
      value => {

        this.getAllCountTaskMember(this.teamParent.id);



      }
    )

  }

  getAllCountTaskMember(id: number) {
    this.taskMemberStatistic = []

    this.dashboardService.getTypePercentageCount(id).subscribe((data: CountTaskTeamMember[]) => {


      this.typeData = data;

      data.forEach((type1: CountTaskTeamMember) => {
        this.member = type1.teamMember
        this.taskDateStatusDto = type1.taskDateStatusDto
        this.tasksAdvanced = type1.tasksAdvanced
        type1.countTaskDto.forEach((type: TypePercentage) => {
          this.doughnutChartData.push(type.value);
          this.doughnutChartLabels.push(type.name);

        })
        const test = new TaskMemberStatistic(this.member, this.doughnutChartLabels, this.doughnutChartData, this.taskDateStatusDto, this.tasksAdvanced)
        this.taskMemberStatistic.push(test)
        this.doughnutChartData = []
        this.doughnutChartLabels = []

      })
    }, error => {
      console.log(error)
    })

  }

  checkTaskdetail(id: number) { this.router.navigateByUrl("home/task-detail/" + id) }


  public convertToPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('/assets/logo.png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Dashboard-Reporting.pdf'); // Generated PDF
    });
  }
}









