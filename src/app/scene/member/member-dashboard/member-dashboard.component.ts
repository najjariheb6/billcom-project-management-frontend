import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as moment from 'moment';
import {  DashboardMemberListDeatil, TypePercentage } from 'src/app/model/task';
import { MemberDashboardService } from 'src/app/rest-service/member-dashboard.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss']
})
export class MemberDashboardComponent implements OnInit {

  memberKpiList: DashboardMemberListDeatil[] = []
  delayRateList: TypePercentage[] = []
  view: any[] = [700, 300];
  views: any[] = [350, 300];

  today: number = Date.now();
  // options
  legendTitle: string = 'weeks';
  legendTitleMulti: string = 'status';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Task Status';
  xAxisLabel: string = 'Team';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 60;
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
    //  domain: ['#dc3545', '#ffc107','#17a2b8', '#28a745', '#CA0B00']

  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['week 1']
  barPadding: number = 8
  tooltipDisabled: boolean = false;

  roundEdges: boolean = false;
  nbDelayed: number = 0;
  nbTask: number = 0;
  nbAdvanced: number = 0;
  DashboardForm: FormGroup
  submitted = false;
  current: boolean = true;
  year:number


  constructor(private formBuilder: FormBuilder,private memberService: MemberDashboardService) { }

  ngOnInit(): void {
    this.memberService.curretnkpiTeamMember().subscribe((data: DashboardMemberListDeatil[]) => {
      this.memberKpiList = data;
      this.nbDelayed =0;
      this.nbTask = 0;
      this.nbAdvanced = 0;
      data.forEach((type1: DashboardMemberListDeatil) => {
        type1.series.forEach((type: TypePercentage) => {
          if (type.name === 'task delayed') {
            this.nbDelayed = this.nbDelayed + type.value
          } else if (type.name === 'Nb task') {
            this.nbTask = this.nbTask + type.value
          } else {
            this.nbAdvanced = this.nbAdvanced + type.value

          }
        })
      })
    }), error => {
      console.log(error)
    }
   this.delayRateKpiTeamMember()
    
    this.DashboardForm = this.formBuilder.group({
      weekDate: ['',Validators.required]
   


    });

  }

  delayRateKpiTeamMember() {
    this.memberService.delayRateKpiTeamMember().subscribe((data) => {
      this.delayRateList = data;
    }), error => {
      console.log(error)
    }
  }
 /* close() {
    this.dialogRef.close()
  }*/

get f() { return this.DashboardForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.DashboardForm.invalid) {
        return;
    }else{

    moment(this.DashboardForm.value.weekDate).format("MMM");
    moment(this.DashboardForm.value.weekDate).format("AAAA");



this.memberService.kpiTeamofTeamMemberMonth( moment(this.DashboardForm.value.weekDate).format("YYYY")).subscribe((data: DashboardMemberListDeatil[]) => {
  

  this.memberKpiList = data;
       this.nbDelayed =0;
      this.nbTask = 0;
      this.nbAdvanced = 0;
      this.current = !this.current

  data.forEach((type1: DashboardMemberListDeatil) => {
    type1.series.forEach((type: TypePercentage) => {
      if (type.name === 'task delayed') {
        this.nbDelayed = this.nbDelayed + type.value
      } else if (type.name === 'Nb task') {
        this.nbTask = this.nbTask + type.value
      } else {
        this.nbAdvanced = this.nbAdvanced + type.value

      }
    })

  })
}), error => {
  console.log(error)
} 







}




  }

  searchYearStatistic(){
    if(this.year != undefined){
    this.memberService.kpiTeamofTeamMemberMonth(this.year).subscribe((data: DashboardMemberListDeatil[]) => {
  

      this.memberKpiList = data;
           this.nbDelayed =0;
          this.nbTask = 0;
          this.nbAdvanced = 0;
          this.current = !this.current
    
      data.forEach((type1: DashboardMemberListDeatil) => {
        type1.series.forEach((type: TypePercentage) => {
          if (type.name === 'task delayed') {
            this.nbDelayed = this.nbDelayed + type.value
          } else if (type.name === 'Nb task') {
            this.nbTask = this.nbTask + type.value
          } else {
            this.nbAdvanced = this.nbAdvanced + type.value
    
          }
        })
    
      })
    }), error => {
      console.log(error)
    } }
    

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
  pdf.save('Member-Dashboard.pdf'); // Generated PDF
  });
  }

  getCurrentWork(){
    this.memberKpiList = []
    this.year = undefined
    this.memberService.curretnkpiTeamMember().subscribe((data: DashboardMemberListDeatil[]) => {
      
      this.memberKpiList = data;
      this.nbDelayed =0;
      this.nbTask = 0;
      this.nbAdvanced = 0;
      this.current = !this.current;
      data.forEach((type1: DashboardMemberListDeatil) => {
        type1.series.forEach((type: TypePercentage) => {
          if (type.name === 'task delayed') {
            this.nbDelayed = this.nbDelayed + type.value
          } else if (type.name === 'Nb task') {
            this.nbTask = this.nbTask + type.value
          } else {
            this.nbAdvanced = this.nbAdvanced + type.value

          }
        })
      })
    }), error => {
      console.log(error)
    }

  }

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }



}

