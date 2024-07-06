import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { MaterialModuleModule } from 'src/app/material-module/material-module.module';
import { EmployeeRoleUpdateComponent } from './employee/employee-role-update/employee-role-update.component';
import { AddRoleComponent } from './employee/employee-role-update/add-role/add-role.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamDetailComponent } from './team/team-detail/team-detail.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { MemberTaskListComponent } from './task/member-task-list/member-task-list.component';
import { SpeceficTaskComponent } from './task/specefic-task/specefic-task.component';
import { CommunSharedModule } from 'src/app/commun-shared/commun-shared.module';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import { ChartsModule } from 'ng2-charts';
import { TeamDashboardComponent } from './team/team-dashboard/team-dashboard.component';
import { DailyDashboardComponent } from './team/daily-dashboard/daily-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeeklyDashboardComponent } from './team/weekly-dashboard/weekly-dashboard.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { HomeDetailComponent } from './project/detail-project/home-detail/home-detail.component';
import { GeneralDetailComponent } from './project/detail-project/general-detail/general-detail.component';
import { ProjectFileComponent } from './project/detail-project/project-file/project-file.component';
import { ProjectTeamComponent } from './project/detail-project/project-team/project-team.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { DashboardProjectsComponent } from './project/dashboard-projects/dashboard-projects.component';
import { DelayedDashboardProjectsComponent } from './project/delayed-dashboard-projects/delayed-dashboard-projects.component';
import { SpeceficDashboardProjectComponent } from './project/specefic-dashboard-project/specefic-dashboard-project.component';
import { TaskDateComponent } from './task/task-date/task-date.component';
import { TaskDateListComponent } from './task/task-date-list/task-date-list.component';
import { ProjectLeaderHomeComponent } from './project-leader/project-leader-home/project-leader-home.component';
import { ProjectLeaderListComponent } from './project-leader/project-leader-list/project-leader-list.component';
import { ListTaskTeamComponent } from './task/list-task-team/list-task-team.component';
import { ChatComponent } from './chat/chat.component';
import { ListEventComponent } from './calendar/list-event/list-event.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventComponent } from './calendar/add-event/add-event.component';
import { UpdateEventComponent } from './calendar/update-event/update-event.component';
import { DetailEventComponent } from './calendar/detail-event/detail-event.component';
import { ProjectChargeDetailComponent } from './project/project-charge-detail/project-charge-detail.component'; // a plugin!
import {NgxPaginationModule} from 'ngx-pagination';
import { NotificationComponent } from './notification/notification.component';
import { RemindComponent } from './remind/remind.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
import { Ng2OrderModule } from 'ng2-order-pipe';
import { DashboardPLProjectsComponent } from './project-leader/dashboard-pl-projects/dashboard-pl-projects.component';
import { DelayedDashboardProjectLeaderComponent } from './project-leader/delayed-dashboard-project-leader/delayed-dashboard-project-leader.component';
import { SpeceficDashboardProjectLeaderComponent } from './project-leader/specefic-dashboard-project-leader/specefic-dashboard-project-leader.component';
import { ChargeDashboardProjectLeaderComponent } from './project-leader/charge-dashboard-project-leader/charge-dashboard-project-leader.component';
import { SortProjectPipe } from './project/sort-project.pipe';
import { SortNotificationPipe } from './notification/sort-notification.pipe';
import { SortEmployeePipe } from './employee/sort-employee.pipe';
import { SortProjectLeaderPipe } from './project-leader/sort-project-leader.pipe';
import { TeamTaskListComponent } from './task/team-task-list/team-task-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    EmployeeListComponent, 
    EmployeeDetailComponent, 
    NewEmployeeComponent, 
    EmployeeUpdateComponent, 
    EmployeeRoleUpdateComponent, 
    AddRoleComponent, 
    AddTeamComponent, 
    TeamListComponent, 
    TeamDetailComponent, 
    CreateTaskComponent, 
    MemberTaskListComponent, 
    SpeceficTaskComponent, 
    TaskDetailComponent,  TeamDashboardComponent, DailyDashboardComponent, 
    WeeklyDashboardComponent, ProjectListComponent, AddProjectComponent,  HomeDetailComponent, GeneralDetailComponent, ProjectFileComponent, ProjectTeamComponent, UpdateProjectComponent, DashboardProjectsComponent, DelayedDashboardProjectsComponent, SpeceficDashboardProjectComponent, TaskDateComponent, TaskDateListComponent, ProjectLeaderHomeComponent, ProjectLeaderListComponent, ListTaskTeamComponent, ChatComponent, ListEventComponent, AddEventComponent, UpdateEventComponent, DetailEventComponent, ProjectChargeDetailComponent, NotificationComponent, RemindComponent, DashboardPLProjectsComponent, DelayedDashboardProjectLeaderComponent, SpeceficDashboardProjectLeaderComponent, ChargeDashboardProjectLeaderComponent, SortProjectPipe, SortNotificationPipe, SortEmployeePipe, SortProjectLeaderPipe, TeamTaskListComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModuleModule,
    ChartsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    DragDropModule,CommunSharedModule,
    ProgressBarModule,FullCalendarModule,
    NgxPaginationModule,
    Ng2OrderModule

  ]
})
export class HomeModule { }
