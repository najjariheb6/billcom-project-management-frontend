import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ProjectList } from 'src/app/model/project';
import { TypePercentage } from 'src/app/model/task';
import { ProjectService } from 'src/app/rest-service/project.service';

@Component({
  selector: 'app-specefic-dashboard-project',
  templateUrl: './specefic-dashboard-project.component.html',
  styleUrls: ['./specefic-dashboard-project.component.scss']
})
export class SpeceficDashboardProjectComponent implements OnInit {
  projects: ProjectList[] = [];
  projectForm: FormGroup;
  projectKpiList: TypePercentage[] = []
  projectProgress: ProjectList;

  constructor( private projectService: ProjectService,private formBuilder: FormBuilder ) { }


  view: any[] = [400, 200];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendPosition: string = 'below';


  colorScheme = {
    domain: ['#f68059', '#ffbf3a', '#1CD4AF', '#BD4F00', '#CA0B00']
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  barPadding: number = 8
  tooltipDisabled: boolean = false;
  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      
      idProject: ['']
    },

    );
    this.getProjects()
  }



  getProjects(){
    this.projectService.listProjectNotCompleted().subscribe(
      (data) => {
        this.projects = data;
      
      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );
  }

  getSpeceficProject(){
    this.projectService.detail(this.projectForm.value.idProject).subscribe ( data => {
      this.projectProgress = data;
    }, err => {
      console.log('error')

    });
    this.projectService.getProjectStatistic(this.projectForm.value.idProject).subscribe((data) => {

      this.projectKpiList = data;

    }, err => {
      console.log(err);

    }

    );







  }
 onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  formatDate(d: Date) {
    return moment(d).format('DD MMMM,YYYY')
  }
  public searchProjects(key: string): void {
    const result: ProjectList[] = [];
    for (const project of this.projects) {
      if (project.project.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        result.push(project);
      }
    }
    this.projects = result;
    if (result.length === 0 || !key) {
      this.getProjects();
    }
  }



}
