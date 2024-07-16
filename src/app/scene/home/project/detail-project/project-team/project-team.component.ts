import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectList} from 'src/app/model/project';
import {Team} from 'src/app/model/team';
import { CommonModule } from '@angular/common';
import {ProjectService} from 'src/app/rest-service/project.service';
import {DialogconfirmService} from 'src/app/shared/service/dialogconfirm.service';
import {NotficationService} from 'src/app/shared/service/notfication.service';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-project-team', templateUrl: './project-team.component.html', styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

    // hostPhoto: String = 'http://localhost:8080/photoUser/'
    hostPhoto: string = environment.urlConfig + `photoUser/`;
    id: any;
    idProject: any;
    @Input() project: ProjectList = null;
    i = -1;

    constructor(public router: Router,
                private dialogService: DialogconfirmService,
                private projectService: ProjectService,
                private notifyService: NotficationService) {
    }

    ngOnInit(): void {
    }

    goToTeamDetails = (id: any) => {
        //   this.id = encodeURIComponent(id)
        this.idProject = this.project.project.id;
        // this.idProject = encodeURI(  this.idProject )
        this.idProject = encodeURIComponent(this.idProject);
        //    let b = id + "/" + this.project.project.id
        //  let a = encodeURIComponent(b)
        const aa = encodeURIComponent(id + '/' + this.idProject);
        this.router.navigateByUrl('home/teamDetail/' + aa);
    }

    removeTeam = (id: number) => {
        if (this.project.project.teamList.length > 0) {
            this.dialogService.openConfirmDialog('This team has tasks, Are you sure you need to delete it?')
                .afterClosed().subscribe(res => {
                if (res) {
                    this.projectService.deleteMemberFromTeam(this.project.project.id, id).subscribe(() => {
                        this.notifyService.showSuccess('team is deleted!', 'ok');
                    }, err => {
                        console.log(err);
                        // alert(err.message)
                    });
                }
            });
        }
    }
}
