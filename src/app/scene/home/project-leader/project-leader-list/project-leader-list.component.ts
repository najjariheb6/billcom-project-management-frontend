import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {DialogConfigModalComponent} from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import {ProjectList} from 'src/app/model/project';
import {ProjectService} from 'src/app/rest-service/project.service';
import {DialogconfirmService} from 'src/app/shared/service/dialogconfirm.service';
import {environment} from 'src/environments/environment';
import {AddTeamComponent} from '../../team/add-team/add-team.component';

@Component({
    selector: 'app-project-leader-list',
    templateUrl: './project-leader-list.component.html',
    styleUrls: ['./project-leader-list.component.scss']
})
export class ProjectLeaderListComponent implements OnInit {
    @Input()
    listProjectLeader: ProjectList[];
    toDate: Date;

    hostPhoto: String = environment.urlConfig + `photoUser/`;
    myDateValue: Date;
    listProjectLeaderSearch: ProjectList[];
    id: any;
    totalRecords: Number;
    page: Number = 1;
    showPeriod: boolean = false;

    constructor(private projectService: ProjectService, private router: Router, private modalComponent: DialogConfigModalComponent, private dialogConfirm: DialogconfirmService) {
    }

    ngOnInit(): void {
        this.totalRecords = this.listProjectLeader.length;

    }


    updateStatus(id: number, status: string) {
        this.projectService.update(id, status).subscribe();
    }

    formatDate(d: Date) {
        return moment(d).format('DD MMMM,YYYY');
    }

    geToCreateTeam(id: number) {
        this.modalComponent.implementDialogConfig(id, AddTeamComponent, '700px', '710px');

    }

    goToProjectDetail(id: any) {
        this.id = encodeURIComponent(id + '/');


        this.router.navigateByUrl('home/project-detail/' + this.id);


    }

    reverseAndTimeStamp(dateString) {
        const reverse = new Date(dateString.split('-').reverse().join('-'));
        return reverse.getTime();
    }

    showSerachPeriode() {

        this.showPeriod = true;
    }

    filterDate() {
        this.listProjectLeaderSearch = this.listProjectLeader;


        let fromdate = moment(this.myDateValue).format('DD-MM-YYYY');
        let todate = moment(this.toDate).format('DD-MM-YYYY');
        if (this.myDateValue && this.toDate) {
            const selectedMembers = this.listProjectLeader.filter(m => {
                    return this.reverseAndTimeStamp(moment(m.project.startedDate).format('DD-MM-YYYY')) >= this.reverseAndTimeStamp(fromdate) && this.reverseAndTimeStamp(moment(m.project.endDate).format('DD-MM-YYYY')) <= this.reverseAndTimeStamp(todate);
                }
            );
            this.listProjectLeader = selectedMembers;
            this.totalRecords = selectedMembers.length;

        } else {
            this.listProjectLeader = this.listProjectLeaderSearch;
        }
    }

}
