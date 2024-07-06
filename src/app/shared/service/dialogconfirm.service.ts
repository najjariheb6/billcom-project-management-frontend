import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/commun-shared/modal/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogconfirmService {

  constructor(private dialog: MatDialog) { }
  openConfirmDialog(msg){
    return  this.dialog.open(ConfirmDialogComponent,{
            width:'540px',
            height:'240px',
            position: {top: "50px"},
            panelClass : 'confirm-dialog-container',
            disableClose: true,
            data :{
              message : msg
            }
    });
  }
}
