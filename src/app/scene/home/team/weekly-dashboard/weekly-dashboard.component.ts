import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {ApiDetail} from 'src/app/model/task';
import {Team} from 'src/app/model/team';
import {DashboardService} from 'src/app/rest-service/dashboard.service';
import {DashboardInteractionService} from 'src/app/shared/service/dashboard-interaction.service';

@Component({
    selector: 'app-weekly-dashboard',
    templateUrl: './weekly-dashboard.component.html',
    styleUrls: ['./weekly-dashboard.component.scss']
})
export class WeeklyDashboardComponent implements OnInit {

    @Input()
    team: Team;
    statWeekList: ApiDetail[] = [];
    view: any[] = [700, 300];

    // options
    legendTitle = 'weeks';
    legendTitleMulti = 'status';
    legendPosition = 'below'; // ['right', 'below']
    legend = true;

    gaugeMin = 1;
    gaugeMax = 20;

    xAxis = true;
    yAxis = true;

    yAxisLabel = 'status';
    xAxisLabel = 'weeks';
    showXAxisLabel = true;
    showYAxisLabel = true;

    maxXAxisTickLength = 30;
    maxYAxisTickLength = 30;
    trimXAxisTicks = false;
    trimYAxisTicks = false;
    rotateXAxisTicks = false;


    animations = true; // animations on load
    showGridLines = true; // grid lines
    showDataLabel = true; // numbers on bars
    gradient = false;
    colorScheme = {
        domain: ['#f68059', '#ffbf3a', '#1CD4AF', '#BD4F00', '#CA0B00']
    };
    schemeType = 'ordinal'; // 'ordinal' or 'linear'
    activeEntries: any[] = ['week 1'];
    barPadding = 8;
    tooltipDisabled = false;


    roundEdges = false;
    DashboardForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private dashboardInteractionService: DashboardInteractionService) {
    }

    get f() {
        return this.DashboardForm.controls;
    }

    ngOnInit(): void {
        this.dashboardService.countKPIweek(this.team.id).subscribe((data: ApiDetail[]) => {
            this.statWeekList = data;
        });

        this.dashboardInteractionService.taskInteractionValue$.subscribe(
            value => {
                this.dashboardService.countKPIweek(this.team.id).subscribe((data: ApiDetail[]) => {
                    this.statWeekList = data;
                });
            }
        );

        this.DashboardForm = this.formBuilder.group({
            weekDate: ['', Validators.required]
        });

    }


    onSubmit() {
        this.submitted = true;
        if (this.DashboardForm.invalid) {
            return;
        } else {

            moment(this.DashboardForm.value.weekDate).format('MMM');
            moment(this.DashboardForm.value.weekDate).format('AAAA');

            this.dashboardService.MonthStatistic(this.team.id, moment(this.DashboardForm.value.weekDate).format('MMMM'), moment(this.DashboardForm.value.weekDate).format('YYYY')).subscribe((data: ApiDetail[]) => {
                this.statWeekList = data;
            });
        }
    }
}
