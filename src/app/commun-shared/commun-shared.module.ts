import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoggedComponent } from './modal/user-logged/user-logged.component';

import { ConfirmDialogComponent } from './modal/confirm-dialog/confirm-dialog.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { UpdateLoggedUserComponent } from './modal/update-logged-user/update-logged-user.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'angular-progress-bar';
import { UserFileComponent } from './modal/user-file/user-file.component';
import { SortDatePipe } from './pipe/sort-date.pipe';
import { SortDateProjectPipe } from './pipe/sort-date-project.pipe';



@NgModule({
  declarations: [
    UserLoggedComponent,
    ConfirmDialogComponent,
    UpdateLoggedUserComponent,
    UserFileComponent,
    SortDatePipe,
    SortDateProjectPipe  ],
  imports: [CommonModule,MaterialModuleModule, FormsModule,ReactiveFormsModule, ProgressBarModule
   
  ],
  exports: [
    UserLoggedComponent,ConfirmDialogComponent,UpdateLoggedUserComponent,SortDatePipe,SortDateProjectPipe,

  ]
})
export class CommunSharedModule { }
