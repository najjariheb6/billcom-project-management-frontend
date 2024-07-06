import { Component, OnInit } from '@angular/core';
import { TypePercentage } from 'src/app/model/task';
import { ProjectService } from 'src/app/rest-service/project.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
@Component({
  selector: 'app-delayed-dashboard-projects',
  templateUrl: './delayed-dashboard-projects.component.html',
  styleUrls: ['./delayed-dashboard-projects.component.scss']
})
export class DelayedDashboardProjectsComponent implements OnInit {
  projectDealyedList: TypePercentage[] = []
  view: any[] = [450, 408];
  today: number = Date.now();

  // options
  legendTitle: string = 'Days';
  legendTitleMulti: string = 'Project';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = false;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Project';
  xAxisLabel: string = 'Days';
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
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjectDealyedDelevered().subscribe((data) => {

      this.projectDealyedList = data;

    }, err => {
      console.log(err);

    }

    );
  }
  public delayedProjectToPDF(){
    var data = document.getElementById('content-delayed');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
   
  const contentDataURL = canvas.toDataURL('/assets/logo.png')
  let pdf = new jspdf.jsPDF('p', 'mm', 'a3'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('Delayed-Project-Dashboard.pdf'); // Generated PDF
  });
  }

}
