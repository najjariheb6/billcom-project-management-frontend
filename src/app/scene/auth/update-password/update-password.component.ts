import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/rest-service/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  public updatePasswordForm: FormGroup;
  observe: boolean;
  var: any;
  checked: boolean;
  submitted: boolean;

  constructor(private _formBuilder: FormBuilder,
  private dialogRef: MatDialogRef<UpdatePasswordComponent>,
  private authService: AuthService,private _router: Router,
  @Inject(MAT_DIALOG_DATA) public data) {

   }
  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
    this.updatePasswordForm = this._formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
        },{
          validator: MustMatch('password', 'confirmPassword')
      } 
    );
 
  }
  get f() { return this.updatePasswordForm.controls; }

onSubmit() {
    this.submitted = true
    
    this.submitted = true;
    if   (this.updatePasswordForm.invalid) {
        return ;
    }else{
  
    const password = this.updatePasswordForm.value.password

    this.authService.updateResetPossword(this.data,password).subscribe(
      data => {
        this._router.navigateByUrl('/login');

      },
      err=>{ 
        console.log(err)
    
    });
  
  
  
       this.dialogRef.close();
    
   
  }
  }  

}
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }}

  

