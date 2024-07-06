import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-dialog-config-modal',
  templateUrl: './dialog-config-modal.component.html',
  styleUrls: ['./dialog-config-modal.component.scss']
})
export class DialogConfigModalComponent {

  constructor(private dialog?: MatDialog) { }

  public implementDialogConfig(id: number, data: any = [], width: string, height: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width;
    dialogConfig.height = height;
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(data, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {

    });




  }
  public implement( data: any = [], width: string, height: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width;
    dialogConfig.height = height;
    const dialogRef = this.dialog.open(data, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {

    });




  }

  public implementTask( id: number, taskType: any,data: any = [], width: string, height: string) {
  //taskType: string
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width;
    dialogConfig.height = height;
    dialogConfig.data = {id,taskType}

    const dialogRef = this.dialog.open(data, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {

    });




  }
  public implementUserLoggedUpdateDialog( user: Employee,data: any = [], width: string, height: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width;
    dialogConfig.height = height;
    dialogConfig.data = user

    const dialogRef = this.dialog.open(data, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {

    });




  }

  public implementProject( project: any,data: any = [], width: string, height: string) {
   //kenet Project raditha any
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width;
    dialogConfig.height = height;
    dialogConfig.data = project;

    const dialogRef = this.dialog.open(data, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {

    });




  }
  public implementTaskList( task: any,data: any = [], width: string, height: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = width;
    dialogConfig.height = height;
    dialogConfig.data = task;

    const dialogRef = this.dialog.open(data, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {

    });




  }

}
