import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from 'src/app/rest-service/auth.service';
import {CheckCodeComponent} from '../check-code/check-code.component';

@Component({
    selector: 'app-reset-password', templateUrl: './reset-password.component.html', styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    ResetForm: FormGroup;
    isPopupOpened = false;

    submitted = false;
    isLogged = false;
    test = false;
    role: string[];

    constructor(private formBuilder: FormBuilder, private _auth: AuthService, private router: Router, private spinner: NgxSpinnerService, private dialog?: MatDialog) {
    }

    get f() {
        return this.ResetForm.controls;
    }

    ngOnInit() {
        this.ResetForm = this.formBuilder.group({
            email: ['', Validators.required, , Validators.pattern('^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$')],
        });


    }

    onSubmit() {
        this.submitted = true;

        if (this.ResetForm.invalid) {
            return;
        } else {

            this.isLogged = true;
            this.spinner.show();

            const email = this.ResetForm.value.email;
            this._auth.sendEmail(email)
                .subscribe(data => {

                    this.isLogged = false;
                    this.test = true;
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.disableClose = false;
                    dialogConfig.autoFocus = true;
                    dialogConfig.width = '500px';
                    dialogConfig.height = '500px';

                    const dialogRef = this.dialog.open(CheckCodeComponent, dialogConfig);

                    dialogRef.afterClosed().subscribe(result => {
                        // this.ResetForm.reset();

                    });
                }, err => {
                    this.isLogged = false;
                    this.onReset();
                });


        }

    }

    onReset() {
        this.submitted = false;
        this.ResetForm.reset();
    }


}




