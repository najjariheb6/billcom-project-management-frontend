import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {DialogConfigModalComponent} from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import {ProjectList} from 'src/app/model/project';
import {ProjectService} from 'src/app/rest-service/project.service';
import {DialogconfirmService} from 'src/app/shared/service/dialogconfirm.service';
import {environment} from 'src/environments/environment';
import {AddProjectComponent} from '../add-project/add-project.component';
import {DashboardProjectsComponent} from '../dashboard-projects/dashboard-projects.component';



@Component({
    selector: 'app-project-list', templateUrl: './project-list.component.html', styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
    projects: ProjectList[] = [];
    hostPhoto: string = environment.urlConfig + `photoUser/`;
    id: any;
    nb: 0;
    nbStoppedProject = 0;
    nbCompletedProject = 0;
    nbPendingProject = 0;
    myDateValue: Date;
    toDate: Date;
    duplicateArray = [];
    selected = 'option2';
    showPeriod = false;
    showTitle = false;
    showStatus = false;
    totalRecords: number;
    page: number;
    console = console;

    constructor(private projectService: ProjectService,
                private modalComponent: DialogConfigModalComponent,
                private router: Router,
                private dialogConfirm: DialogconfirmService) {
    }

    ngOnInit(): void {
        this.getList();

        this.projectService.refreshNeeded.subscribe(() => {
            this.getList();
        });
    }

    getList(): void {
        this.myDateValue = null;
        this.toDate = null;
        this.projectService.liste().subscribe((data: ProjectList[]) => {
            this.projects = data;

            this.totalRecords = data.length;
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


        }, err => {
            console.log(err);
            // alert(err.message)
        });
    }

    showSerachPeriode = () => {
        this.showTitle = false;
        this.showStatus = false;
        this.showPeriod = true;
    }

    searchProjectName = () => {
        this.showPeriod = false;
        this.showStatus = false;
        this.showTitle = true;

    }

    searchProjectStatus = () => {
        this.showPeriod = false;
        this.showTitle = false;
        this.showStatus = true;
    }

    public searchByTitle(key: string): void {
        const results: ProjectList[] = [];
        for (const p of this.projects) {
            if (p.project.name.toLowerCase().indexOf(key.toLowerCase()) !== -1

            ) {
                results.push(p);
                this.totalRecords = results.length;

            }
        }
        this.projects = results;
        if (results.length === 0 || !key) {
            this.getList();
        }
    }

    public searchByStatus(key: string): void {
        const results: ProjectList[] = [];
        for (const p of this.projects) {
            if (p.project.statusProject.toLowerCase().indexOf(key.toLowerCase()) !== -1

            ) {
                results.push(p);
            }
        }
        this.projects = results;
        this.totalRecords = results.length;

        if (results.length === 0 || !key) {
            this.getList();
        }
    }

    getEmployeeDetails = (idEmployee: number) => {};

    // formatDate = (d: Date) => moment(d).format('DD MMMM,YYYY');

    formatDate = (d) =>   moment.utc(d).format('DD MMMM,YYYY');


    goToAddProject = () => {

        this.modalComponent.implement(AddProjectComponent, '1000px', '800px');
    }

    updateStatus = (id: number, status: string) => {

        this.dialogConfirm.openConfirmDialog('Are you sure to update status to ' + status + '?')
            .afterClosed().subscribe(res => {
            if (res) {
                this.projectService.update(id, status).subscribe();
            }
        });
    }

    goToProjectDetail = (id: any) => {
        this.id = encodeURIComponent(id + '/');
        this.router.navigateByUrl('home/project-detail/' + this.id);
    }

    goToShowDashboardProject = () => {
        this.modalComponent.implement(DashboardProjectsComponent, '1000px', '800px');
    }

    reverseAndTimeStamp = dateString => {
        const reverse = new Date(dateString.split('-').reverse().join('-'));
        return reverse.getTime();
    }

    filterDate = () => {
        const fromdate = moment(this.myDateValue).format('DD-MM-YYYY');
        // console.log(fromdate)
        const todate = moment(this.toDate).format('DD-MM-YYYY');
        if (this.myDateValue && this.toDate) {
            const selectedMembers = this.projects.filter(m => {
                return this.reverseAndTimeStamp(moment(m.project.startedDate)
                    .format('DD-MM-YYYY')) >= this.reverseAndTimeStamp(fromdate) && this.reverseAndTimeStamp(moment(m.project.endDate)
                    .format('DD-MM-YYYY')) <= this.reverseAndTimeStamp(todate);
            });
            this.projects = selectedMembers;
            this.totalRecords = selectedMembers.length;

        } else {
            this.getList();
        }
    }

}
