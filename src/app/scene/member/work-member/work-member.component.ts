import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Team } from 'src/app/model/team';
import { WorkMemberService } from 'src/app/rest-service/work-member.service';

@Component({
    selector: 'app-work-member',
    templateUrl: './work-member.component.html',
    styleUrls: ['./work-member.component.scss']
})
export class WorkMemberComponent implements OnInit {
    teams: Team[] = [];
    workDtoList: any = [];
    DashboardForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private workService: WorkMemberService) { }

    get f() {
        return this.DashboardForm.controls;
    }

    ngOnInit(): void {
        this.getTeamList();
        this.getWorkMemberList();
        this.DashboardForm = this.formBuilder.group({
            weekDate: ['', Validators.required]
        });
    }

    getTeamList(): void {
        this.workService.getteamList().subscribe((data: Team[]) => {
            this.teams = data;
        }, err => {
            console.error(err);
        });
    }

    formatDate(d: Date): string {
        return moment(d).format('DD/MM');
    }

    getWorkMemberList(): void {
        this.workService.getWorkMemberList().subscribe((data: any) => {
            this.workDtoList = data;
        }, err => {
            console.error(err);
        });
    }

    addHourToMemberWork(worknbHour: number, id: number): void {
        this.workService.addHourToMemberWork(id, worknbHour).subscribe();
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.DashboardForm.invalid) {
            return;
        }

        const selectedDate = moment(this.DashboardForm.value.weekDate);
        const month = selectedDate.format('MMMM');
        const year = selectedDate.format('YYYY');

        this.workService.getteamListSearch(month, year).subscribe((data: any) => {
            this.teams = data;
        });

        this.workService.getWorkMemberListSearch(month, year).subscribe((data: any) => {
            this.workDtoList = data;
        });
    }
}
