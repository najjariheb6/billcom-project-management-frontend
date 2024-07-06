import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoggedComponent } from './commun-shared/modal/user-logged/user-logged.component';
import { GuardEmployeeGuard } from './guard/guard-employee.guard';
import { AttemptFirstLoginComponent } from './scene/auth/attempt-first-login/attempt-first-login.component';
import { AuthGuard } from './scene/auth/auth.guard';
import { CheckCodeComponent } from './scene/auth/check-code/check-code.component';
import { LoginComponent } from './scene/auth/login/login.component';
import { ResetPasswordComponent } from './scene/auth/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './scene/auth/update-password/update-password.component';
import { ListEventComponent } from './scene/home/calendar/list-event/list-event.component';
import { ChatComponent } from './scene/home/chat/chat.component';
import { UserComponent } from './scene/home/components/user/user.component';
import { DemandeComponent } from './scene/home/dayOff/demande/demande.component';
import { EmployeeDetailComponent } from './scene/home/employee/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './scene/home/employee/employee-list/employee-list.component';
import { EmployeeRoleUpdateComponent } from './scene/home/employee/employee-role-update/employee-role-update.component';
import { EmployeeUpdateComponent } from './scene/home/employee/employee-update/employee-update.component';
import { NewEmployeeComponent } from './scene/home/employee/new-employee/new-employee.component';
import { HomeComponent } from './scene/home/home.component';
import { NotificationComponent } from './scene/home/notification/notification.component';
import { DashboardPLProjectsComponent } from './scene/home/project-leader/dashboard-pl-projects/dashboard-pl-projects.component';
import { ProjectLeaderHomeComponent } from './scene/home/project-leader/project-leader-home/project-leader-home.component';
import { DashboardProjectsComponent } from './scene/home/project/dashboard-projects/dashboard-projects.component';
import { HomeDetailComponent } from './scene/home/project/detail-project/home-detail/home-detail.component';
import { ProjectListComponent } from './scene/home/project/project-list/project-list.component';
import { RemindComponent } from './scene/home/remind/remind.component';


import { CreateTaskComponent } from './scene/home/task/create-task/create-task.component';
import { MemberTaskListComponent } from './scene/home/task/member-task-list/member-task-list.component';
import { SpeceficTaskComponent } from './scene/home/task/specefic-task/specefic-task.component';
import { TaskDetailComponent } from './scene/home/task/task-detail/task-detail.component';
import { TeamDashboardComponent } from './scene/home/team/team-dashboard/team-dashboard.component';
import { TeamDetailComponent } from './scene/home/team/team-detail/team-detail.component';
import { TeamListComponent } from './scene/home/team/team-list/team-list.component';
import { LeaderDashboardComponent } from './scene/leader/leader-dashboard/leader-dashboard.component';
import { LeaderHomeComponent } from './scene/leader/leader-home/leader-home.component';
import { TeamLeadDetailComponent } from './scene/leader/team-lead-detail/team-lead-detail.component';
import { MemberDashboardComponent } from './scene/member/member-dashboard/member-dashboard.component';
import { MemberHomeComponent } from './scene/member/member-home/member-home.component';
import { WorkMemberComponent } from './scene/member/work-member/work-member.component';

const routes: Routes = [
  {
    path: '',
 
   component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'test',
    component: UserLoggedComponent
  },
  {
    path: 'firstLogin',
    component: AttemptFirstLoginComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent
  },
  {
    path: 'check-code',
    component: CheckCodeComponent
  },
/*  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserComponent

      }]
  },*/

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserComponent

      },
      {
        path: 'chat/:id',
        component: ChatComponent

      }, {
        path: 'notification',
        component: NotificationComponent

      }, {
        path: 'remind',
        component: RemindComponent

      }, {
        path: 'dayOff/demande',
        component: DemandeComponent

      }
      ,{
        path: 'chat/:id/:idProject',
        component: ChatComponent

      },
      {
        path: 'role',
        component: EmployeeRoleUpdateComponent

      },
      {
        path: 'listEmployee',
        component: EmployeeListComponent,
        canActivate: [GuardEmployeeGuard],

      },
      {
        path: 'new-employee',
        component: NewEmployeeComponent

      },
      {
        path: 'employee-detail/:id',
        component: EmployeeDetailComponent
      },
      {
        path: 'employee-update/:id',
        component: EmployeeUpdateComponent
      },
      {
        path: 'team',
        component: TeamListComponent,
        canActivate: [GuardEmployeeGuard],
      },{
        path: 'calendar/:id',
        component: ListEventComponent,
      },{
        path: 'calendar/:id/:idProject',
        component: ListEventComponent,
      },
      {
        path: 'project-list',
        component: ProjectListComponent,
        canActivate: [GuardEmployeeGuard],

      },{
        path: 'project-detail/:id',
        component: HomeDetailComponent
      },
      {
        path: 'project-dashboard',
        component: DashboardProjectsComponent
      },
      {
        path: 'teamDetail/:id',
        component: TeamDetailComponent,
      },
      {
        path: 'teamDetail/:id/:idProject',
        component: TeamDetailComponent,
      }
      ,{
        path: 'teamDetailDashboard',
        component: TeamDashboardComponent,
      },
      {
        path: 'test/:id',
        component: MemberTaskListComponent
      },{
        path: 'task/:id',
        component: MemberTaskListComponent
      },
      {
        path: 'task/:id/:idTeam',
        component: MemberTaskListComponent
      },
      {
        path: 'task/:id/:idTeam/:idProject',
        component: MemberTaskListComponent
      },
      {
        path: 'new-task',
        component: CreateTaskComponent
      }, {
        path: 'specefic-task',
        component: SpeceficTaskComponent
      },{
        path: 'task-detail/:id',
        component: TaskDetailComponent
      },
      {
        path: 'task-detail/:id/:idTasks/:idTeam/:idProject',
        component: TaskDetailComponent
      },{
        path: 'task-detail/:id/:idTasks',
        component: TaskDetailComponent
      },{
        path: 'task-detail/:id/:idTasks/:idTeam',
        component: TaskDetailComponent
      },



    ]
  },
  {
    path: 'leader',
    component: HomeComponent,
    canActivate: [AuthGuard],

    children: [

      {
        path: 'leader-home',
        component: LeaderHomeComponent

      },{
        path:'team-lead-detail/:id',
        component:TeamLeadDetailComponent
      },{
        path:'leader-chart',
        component:LeaderDashboardComponent
      }
    ]
  },
  {
    path: 'member',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'member-home',
        component: MemberHomeComponent

      },{
        path: 'user-profil',
        component: UserLoggedComponent

      },{
        path: 'member-dashboard',
        component: MemberDashboardComponent

      },{
        path: 'member-hour',
        component: WorkMemberComponent

      }
    ]
  },
  {
    path: 'project-leader',
    component: HomeComponent,
    canActivate: [AuthGuard],

    children: [

      {
        path: 'home',
        component: ProjectLeaderHomeComponent

      },
      {
        path: 'charts',
        component: DashboardPLProjectsComponent

      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
