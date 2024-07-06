import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderHomeComponent } from './leader-home/leader-home.component';
import { CommunSharedModule } from 'src/app/commun-shared/commun-shared.module';
import { TeamLeadDetailComponent } from './team-lead-detail/team-lead-detail.component';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';
import { AppModule } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaderDashboardComponent } from './leader-dashboard/leader-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [LeaderHomeComponent, TeamLeadDetailComponent, LeaderDashboardComponent],
  imports: [
    CommonModule,CommunSharedModule,MaterialModuleModule,ReactiveFormsModule,
    FormsModule,NgxChartsModule,    NgxPaginationModule,

  ]
})
export class LeaderModule { }
