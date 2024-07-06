import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DialogConfigModalComponent } from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import { ProjectList } from 'src/app/model/project';
import { AuthService } from 'src/app/rest-service/auth.service';
import { ProjectService } from 'src/app/rest-service/project.service';
import { environment } from 'src/environments/environment';
import { AddTeamComponent } from '../../../team/add-team/add-team.component';
import { UpdateProjectComponent } from '../../update-project/update-project.component';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {
  @Input()
  projectProgress: ProjectList;
  id:any
 // hostPhoto: String = 'http://localhost:8080/photoUser/'
  hostPhoto: String = environment.urlConfig  + `photoUser/`

  constructor(public auth:AuthService,private projectService:ProjectService, private route: ActivatedRoute,private modalComponent: DialogConfigModalComponent) { }

  ngOnInit(): void {
    this.projectService.refreshNeeded.subscribe(() => {
      this.getDetail()  

    }
    )


    this.getDetail()  

  }

  getDetail(){
    let id = this.route.snapshot.params.id;
    let decode = decodeURIComponent(this.route.snapshot.params.id)
    this.id = decode.substring(0, decode.indexOf("/"))

    this.projectService.detail(this.id).subscribe ( data => {
      this.projectProgress = data;
    }, err => {
      console.log('error')

    });
  }
  formatDate(d: Date) {
    return moment(d).format('DD MMMM,YY h:mm a ')
  }


  geToCreateTeam(){
    this.modalComponent.implementProject( this.projectProgress,AddTeamComponent, '700px', '710px')

  }



  goToUpdateProject(){
   // console.log(this.projectProgress.project)
    this.modalComponent.implementProject(this.projectProgress.project,UpdateProjectComponent, '900px', '450px')
      
  }
 
}
