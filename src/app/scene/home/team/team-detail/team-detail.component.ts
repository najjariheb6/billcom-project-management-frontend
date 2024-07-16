import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChartOptions, ChartType} from 'chart.js';
import * as moment from 'moment';
import {Color, Label, SingleDataSet} from 'ng2-charts';
import {DialogConfigModalComponent} from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import {Employee} from 'src/app/model/employee';
import {Member} from 'src/app/model/member';
import {CountTaskTeamMember} from 'src/app/model/task';
import {Team} from 'src/app/model/team';
import {AuthService} from 'src/app/rest-service/auth.service';
import {EmployeeServiceService} from 'src/app/rest-service/employee-service.service';
import {TeamService} from 'src/app/rest-service/team.service';
import {DialogconfirmService} from 'src/app/shared/service/dialogconfirm.service';
import {environment} from 'src/environments/environment';
import {CreateTaskComponent} from '../../task/create-task/create-task.component';
import {TeamTaskListComponent} from '../../task/team-task-list/team-task-list.component';

@Component({
    selector: 'app-team-detail', templateUrl: './team-detail.component.html', styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

    public doughnutChartOptions: ChartOptions = {
        responsive: true, legend: {
            display: false,
        }, cutoutPercentage: 80,
    };
    public doughnutChartLabels: Label[] = [];
    public doughnutChartData: SingleDataSet = [];
    public doughnutChartType: ChartType = 'doughnut';
    public doughnutChartColor: Color[] = [{backgroundColor: ['#f68059', '#ffbf3a', '#4e3dc8']},];
    public typeData: CountTaskTeamMember[] = [];
    members: Member[] = [];
    team: Team = null;
    employees: Employee[] = [];
    hostPhoto: string = environment.urlConfig + `photoUser/`;
    nb = 0;
    memberForm: FormGroup;
    number: number;
    project: any;
    showProject = false;
    id: any;
    idProject: any;

    constructor(public authService: AuthService,
                private modalComponent: DialogConfigModalComponent,
                private formBuilder: FormBuilder,
                private dialogService: DialogconfirmService,
                private teamService: TeamService,
                private route: ActivatedRoute,
                private employeeService: EmployeeServiceService,
                public router: Router) {
    }

    ngOnInit(): void {

        this.memberForm = this.formBuilder.group({
            idmembers: ['']
        }, );

        // let id = this.route.snapshot.params.id
        let decode = decodeURIComponent(this.route.snapshot.params.id);

        this.id = decode.substring(0, decode.indexOf('/'));
        this.idProject = decode.substring(decode.indexOf('/') + 1);

        this.getProjectDetail(this.id);

        this.teamService.detail(this.id).subscribe(data => {
            this.team = data;
            this.getTeamMember(this.id);
        }, err => {
            console.log(err);

        });
        this.teamService.refreshDetail.subscribe(() => {
            this.getTeamMember(this.id);
        });
    }

    showTaskTeam() {
        // let id=this.route.snapshot.params.id;

        this.modalComponent.implementDialogConfig(this.id, TeamTaskListComponent, '1100px', '800px');
    }


    getProjectDetail(id: number) {
        this.teamService.projectTeamDetail(id).subscribe(data => {
            this.project = data;
        }, err => {
            console.log(err);

        });
    }


    getTeamMember(nb: number) {
        this.teamService.getTeamMember(nb).subscribe(data => {
            this.members = data;
        });
    }

    getListMember() {
        this.employeeService.listeMemberEmployee().subscribe((data: Employee[]) => {

            this.employees = data;

        });
    }

    addMemberToTeam(id: number) {
        // this.submitted = true
        this.teamService.addMemberToTeam(id, this.memberForm.value.idmembers).subscribe(data => {
            //  this.submitted = false
            this.memberForm.reset();
        });

    }

    deleteMemberFromTeam(list: any) {
        var bumber: any[] = [list];
        this.dialogService.openConfirmDialog('Are you sure to delete this member?')
            .afterClosed().subscribe(res => {
            if (res) {
                let decode = decodeURIComponent(this.route.snapshot.params.id);

                this.id = decode.substring(0, decode.indexOf('/'));

                this.teamService.deleteMemberFromTeam(this.id, bumber).subscribe(() => {

                }, err => {
                    console.log(err);
                });
            }
        });

    }

    goToTask(id: number) {
        let idTeam = this.id;
        // let idProject = this.route.snapshot.params.idProject;


        // this.router.navigateByUrl("home/task/" + id + "/" + idTeam + "/" + idProject)
        this.id = encodeURIComponent(id + '/' + idTeam + '/' + this.idProject);
        //  this.router.navigateByUrl("home/task/" + id + "/" + idTeam + "/" + this.idProject)
        this.router.navigateByUrl('home/task/' + this.id);
    }

    redirectToTask(id: number) {


        //  let idTeam = this.id;
        //let decode = decodeURIComponent(this.route.snapshot.params.id)

        // let idTeam= decode.substring(0, decode.indexOf("/"))
        let idTask = encodeURIComponent(id + '/' + this.id + '/');

        this.router.navigateByUrl('home/task/' + idTask);

    }


    redirectTeamLeadToCalendar() {

        // let id=this.route.snapshot.params.id;


        let id = encodeURIComponent(this.id + '/');

        this.router.navigateByUrl('home/calendar/' + id);

    }

    createRoom() {
        // let id=this.route.snapshot.params.id;
        // let idProject = this.route.snapshot.params.idProject;


        this.router.navigateByUrl('home/chat/' + this.id + '/' + this.idProject);


    }

    RedirectToRoom() {
        //  let id=this.route.snapshot.params.id;
        let id = encodeURIComponent(this.id + '/');

        this.router.navigateByUrl('home/chat/' + id);
    }

    redirectToProject() {
        let id = encodeURIComponent(this.idProject + '/');


        this.router.navigateByUrl('/home/project-detail/' + id);
    }

    public searchMember(key: string): void {
        const results: Employee[] = [];
        for (const employee of this.employees) {
            if (employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 || employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(employee);

            }
        }
        this.employees = results;

        if (results.length === 0 || !key) {
            key = null;
            this.getListMember();
        }
    }

    addTask(id: number) {

        this.modalComponent.implementTaskList(id, CreateTaskComponent, '1200px', '750px');


    }


    formatDate(d: Date) {
        return moment(d).format('DD MMMM,YYYY');
    }


    showProjectDetail() {
        this.showProject = !this.showProject;
    }


    TaskForm() {

        this.modalComponent.implement(CreateTaskComponent, '1200px', '750px');


    }


}

