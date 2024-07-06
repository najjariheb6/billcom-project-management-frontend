import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectList } from 'src/app/model/project';
import { TypePercentage } from 'src/app/model/task';
import { ProjectService } from 'src/app/rest-service/project.service';

@Component({
  selector: 'app-project-charge-detail',
  templateUrl: './project-charge-detail.component.html',
  styleUrls: ['./project-charge-detail.component.scss']
})
export class ProjectChargeDetailComponent implements OnInit {
 
  projectChargeDetail: TypePercentage[] = []
  projects: ProjectList[] = [];

  projectForm: FormGroup;

  constructor( private projectService: ProjectService,private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      
      idProject: ['']
    },

    );
    this.getProjects()

  }

  getProjects(){
    this.projectService.liste().subscribe(
      (data) => {
        this.projects = data;
      
      },
      err => {
        console.log(err)
        //alert(err.message)          
      }


    );
  }
  getProjectSpecefic(){
    this.projectService.getchargeAssismentProjetList(this.projectForm.value.idProject).subscribe ( data => {
      this.projectChargeDetail = data;
    }, err => {
      console.log('error')

    });
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
