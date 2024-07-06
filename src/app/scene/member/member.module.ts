import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberHomeComponent } from './member-home/member-home.component';
import { CommunSharedModule } from 'src/app/commun-shared/commun-shared.module';
import { ProgressBarModule } from 'angular-progress-bar';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { HomeModule } from '../home/home.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberTaskStatisticComponent } from './member-task-statistic/member-task-statistic.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberWorkHourPipe } from './member-work-hour.pipe';
import { WorkMemberComponent } from './work-member/work-member.component';



@NgModule({
  declarations: [MemberHomeComponent, MemberDashboardComponent, MemberTaskStatisticComponent, MemberWorkHourPipe, WorkMemberComponent],
  imports: [
    CommonModule,CommunSharedModule,ProgressBarModule,    NgxChartsModule,FormsModule,SharedModule,        ReactiveFormsModule


  ], exports: [
  MemberTaskStatisticComponent
]
})
export class MemberModule { }
