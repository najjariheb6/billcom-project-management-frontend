import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './scene/home/home.module';
import { LoginComponent } from './scene/auth/login/login.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './rest-service/auth.service';
import { AuthGuard } from './scene/auth/auth.guard';
import { TokenInterceptorService } from './rest-service/token-interceptor.service'
import { EmployeeServiceService } from './rest-service/employee-service.service';
import { ResetPasswordComponent } from './scene/auth/reset-password/reset-password.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { MaterialModuleModule } from './material-module/material-module.module';
import { UpdatePasswordComponent } from './scene/auth/update-password/update-password.component';
import { CheckCodeComponent } from './scene/auth/check-code/check-code.component';
import { RoleService } from './rest-service/role.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NzNotificationModule} from 'ng-zorro-antd/notification';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { DialogConfigModalComponent } from './commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import { LeaderModule } from './scene/leader/leader.module';
import { MemberModule } from './scene/member/member.module';
import { CommonModule } from '@angular/common';
import { CommunSharedModule } from './commun-shared/commun-shared.module';
import { AttemptFirstLoginComponent } from './scene/auth/attempt-first-login/attempt-first-login.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { DemandeComponent } from './scene/home/dayOff/demande/demande.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    CheckCodeComponent,
    DialogConfigModalComponent,
    AttemptFirstLoginComponent,
    DemandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    HomeModule,
    LeaderModule,
    MemberModule,
    CommonModule,
    HttpClientModule,
    CommunSharedModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true
      }
    ),
    NzNotificationModule,
    Ng2OrderModule,
  ],
  
  providers: [AuthService, AuthGuard,EmployeeServiceService,RoleService,DialogConfigModalComponent,
  
  { provide: HTTP_INTERCEPTORS,useClass: TokenInterceptorService,multi: true},
  { provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true},
 
],

  
  bootstrap: [AppComponent],
  entryComponents:[LoginComponent,UpdatePasswordComponent]
})
export class AppModule { }
