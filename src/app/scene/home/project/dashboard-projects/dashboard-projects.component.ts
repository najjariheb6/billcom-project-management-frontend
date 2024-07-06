import { Component, OnInit } from '@angular/core';
import { TypePercentage } from 'src/app/model/task';
import { ProjectService } from 'src/app/rest-service/project.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit {

  TimeGap: TypePercentage[] = []
  view: any[] = [800, 300];
  today: number = Date.now();

  // options
  legendTitle: string = 'Days';
  legendTitleMulti: string = 'Project';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;

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


  roundEdges: boolean = false;
  gainDays: number = 0;
  lostDays: number = 0;
  max : number  = 0;
 projectName : string
 constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjectTimeGap().subscribe((data) => {

      this.TimeGap = data;

      data.forEach((type: TypePercentage) => {

        if (type.value < 0) {
          this.gainDays = this.gainDays + Math.abs(type.value)
           if(this.max <  Math.abs(type.value)){
             this.max = Math.abs(type.value)
            this.projectName = type.name
           }
  
        } else {
          this.lostDays = this.lostDays + type.value
        }
      })

    }, err => {
      console.log(err);

    }

    );
  }
  public convertToPDF(){
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
  pdf.save('Completed-Project-Dashboard.pdf'); // Generated PDF
  });
  }
 





}
