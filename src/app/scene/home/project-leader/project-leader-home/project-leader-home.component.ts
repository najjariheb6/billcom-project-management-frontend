import {Component, OnInit} from '@angular/core';
import {ProjectList} from 'src/app/model/project';
import {ProjectService} from 'src/app/rest-service/project.service';

@Component({
    selector: 'app-project-leader-home',
    templateUrl: './project-leader-home.component.html',
    styleUrls: ['./project-leader-home.component.scss']
})
export class ProjectLeaderHomeComponent implements OnInit {

    nb = 0;
    nbStoppedProject = 0;
    nbCompletedProject = 0;
    nbPendingProject = 0;
    listProjectLeader: ProjectList[] = [];

    constructor(private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.getList();

        this.projectService.refreshNeeded.subscribe(() => {
            this.getList();
        });
    }


    getList(): void {
        this.projectService.getListProjectProjectLeader().subscribe(
            (data: ProjectList[]) => {
                this.listProjectLeader = data;
                console.log(this.listProjectLeader);
                this.nbPendingProject = 0;
                this.nbStoppedProject = 0;
                this.nbCompletedProject = 0;
                data.forEach((type1: ProjectList) => {
                    if (type1.project.statusProject === 'COMPLETED') {
                        this.nbCompletedProject = this.nbCompletedProject + 1;
                    } else if (type1.project.statusProject === 'PAUSED') {
                        this.nbPendingProject = this.nbPendingProject + 1;
                    } else if (type1.project.statusProject === 'STOPPED') {
                        this.nbStoppedProject = this.nbStoppedProject + 1;
                    }
                });
            },
            err => {
                console.log(err);
                // alert(err.message)
            }
        );
    }
}
