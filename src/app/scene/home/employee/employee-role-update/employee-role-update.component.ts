import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { RoleService } from 'src/app/rest-service/role.service';
import { DialogconfirmService } from 'src/app/shared/service/dialogconfirm.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import { AddRoleComponent } from './add-role/add-role.component';

@Component({
  selector: 'app-employee-role-update',
  templateUrl: './employee-role-update.component.html',
  styleUrls: ['./employee-role-update.component.scss']
})
export class EmployeeRoleUpdateComponent implements OnInit {
  titleUpdateRole : String = 'User Role'

  roles: Role[] = [];
  constructor(public roleService : RoleService,public dialogRef : MatDialogRef<EmployeeRoleUpdateComponent>,private  notifyService : NotficationService,private dialogService: DialogconfirmService , @Inject(MAT_DIALOG_DATA) public data, private dialog?: MatDialog ) { }

  ngOnInit(): void {
    this.roleService.refreshNeeded.subscribe(() =>{
      this.getList();
    }
    )
    this.getList()
   
  }
  
  getList(){
    this.roleService.liste(this.data).subscribe(
      data => {  this.roles = data ;
      }
        ,err => {
          console.log(err);
          
        }

      
    );
  }
  
  
  deleteRole( name:String){

    this.dialogService.openConfirmDialog('Are you sure you need to delete role User?')
  .afterClosed().subscribe(res=>{
    if(res){
      this.roleService.delete(this.data,name).subscribe(
        data =>{
          
          this.notifyService.showSuccess("User Role deleted","Ok!")
        }
      );
    }})
    
  }

  addRole(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width= '400px';
    dialogConfig.height= '600px';
    dialogConfig.data=this.data;
    const dialogRef = this.dialog.open(AddRoleComponent, dialogConfig);
   
    dialogRef.afterClosed().subscribe(result => {
  
    });

  }

  close(){
    this.dialogRef.close()
  }

}
