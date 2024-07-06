import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/rest-service/auth.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})
export class CheckCodeComponent implements OnInit {
  public checkForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CheckCodeComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog?: MatDialog) { }
  
    onNoClick(): void {
      this.dialogRef.close();
     }
  
    ngOnInit() {
      this.checkForm = this._formBuilder.group({
        code: [ '', [Validators.required]]          } 
      );
   
    }
  
    onSubmit() {
      
    
      const code = this.checkForm.value.code
  
  
      this.authService.checkcode(code).subscribe(
        data => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '500px';
          dialogConfig.height = '500px';
          dialogConfig.data = code
          const dialogRef = this.dialog.open(UpdatePasswordComponent, dialogConfig);
  
        },
        err=>{ 
          console.log(err)
      
      });
    
    
    
         this.dialogRef.close();
      
     
    }
    }  
  