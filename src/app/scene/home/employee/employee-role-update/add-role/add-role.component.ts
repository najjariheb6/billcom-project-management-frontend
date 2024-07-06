import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { RoleService } from 'src/app/rest-service/role.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

    addRoleForm: FormGroup;
  submitted: boolean;
  list1: Role[];
  constructor(private formBuilder: FormBuilder, private roleService: RoleService,public dialogRef : MatDialogRef<AddRoleComponent>,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data,private  notifyService : NotficationService ) { }

  ngOnInit(): void {
    this.getListOfRoles();
    this.addRoleForm = this.formBuilder.group({
     
      role: ['', Validators.required],
  });
  }
  get f() { return this.addRoleForm.controls;
  
 
  
  }

  onSubmit() {

    this.submitted = true;
    if   (this.addRoleForm.invalid) {
        return ;
    }else{
      this.roleService.addUserAccessRole(this.data, [this.addRoleForm.value.role]).subscribe(
        data => {
            this.dialogRef.close()

        },err => {
             
          console.log(err);

      }
  );}

  
}

onReset() {
  this.submitted = false;
  this.addRoleForm.reset();

}
close() {

  this.dialogRef.close()
}
getListOfRoles() {
  this.roleService.getRoleList().subscribe(data => {
    console.log('data from api', data);
    this.list1 = data;

  })
}

}