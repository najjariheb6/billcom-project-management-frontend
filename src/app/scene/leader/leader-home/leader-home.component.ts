import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogConfigModalComponent} from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import {Employee} from 'src/app/model/employee';
import {Member} from 'src/app/model/member';
import {Team} from 'src/app/model/team';
import {EmployeeServiceService} from 'src/app/rest-service/employee-service.service';
import {TeamService} from 'src/app/rest-service/team.service';
import {environment} from 'src/environments/environment';
import * as moment from 'moment';

import {AddTeamComponent} from '../../home/team/add-team/add-team.component';
import {TeamTaskListComponent} from '../../home/task/team-task-list/team-task-list.component';

@Component({
    selector: 'app-leader-home',
    templateUrl: './leader-home.component.html',
    styleUrls: ['./leader-home.component.scss']
})
export class LeaderHomeComponent implements OnInit {


    teams: Team[] = [];
    // employees: Employee[] = [];
    currentTime: any;
    number: number;
    members: Member[] = [];
    totalRecords: Number;
    page: Number = 1;
    //hostPhoto: string = 'http://localhost:8080/photoUser/'
    id: any;
    hostPhoto: String = environment.urlConfig + `photoUser/`;

    constructor(private teamService: TeamService, private modalComponent: DialogConfigModalComponent, private router: Router, private dialog?: MatDialog) {
    }

    ngOnInit(): void {


        this.getTeamList();
    }

    getTeamList(): void {
        this.teamService.teamListOfLeader().subscribe(
            (data: Team[]) => {

                this.teams = data;
                this.totalRecords = data.length;

            },
            err => {
                console.log(err);
                //alert(err.message)
            }
        );

    }


    PassedList() {
        this.teamService.passedTeamListOfLeader().subscribe(
            (data: Team[]) => {

                this.teams = data;
                this.totalRecords = data.length;

            },
            err => {
                console.log(err);
                //alert(err.message)
            }
        );

    }

    FutureList() {

        this.teamService.futureTeamListOfLeader().subscribe(
            (data: Team[]) => {

                this.teams = data;
                this.totalRecords = data.length;

            },
            err => {
                console.log(err);
                //alert(err.message)
            }
        );


    }

    showTaskTeam(id: number) {

        this.modalComponent.implementDialogConfig(id, TeamTaskListComponent, '1100px', '800px');
    }

    public searchTeams(key: string): void {
        const results: Team[] = [];
        for (const team of this.teams) {
            if (team.teamName.toLowerCase().indexOf(key.toLowerCase()) !== -1

            ) {
                results.push(team);
            }
        }
        this.teams = results;
        if (results.length === 0 || !key) {
            this.getTeamList();
        }
    }

    goToTask(id: number, idTeam: number) {
        let idTask = encodeURIComponent(id + '/' + idTeam + '/');

        this.router.navigateByUrl('home/task/' + idTask);
    }

    goToCalendar(uri: number) {
        let id = encodeURIComponent(uri + '/');


        this.router.navigateByUrl('home/calendar/' + id);

    }

    formatDate(d: Date) {
        return moment(d).format('DD MMMM,YY  ');
    }


    goToTeamDetails(id: any) {

        this.id = encodeURIComponent(id + '/');

        this.router.navigateByUrl('home/teamDetail/' + this.id);
    }


}


