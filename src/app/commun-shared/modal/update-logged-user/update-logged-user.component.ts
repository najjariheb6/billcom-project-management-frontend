import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Employee, User} from 'src/app/model/employee';
import {EmployeeServiceService} from 'src/app/rest-service/employee-service.service';
import {NotficationService} from 'src/app/shared/service/notfication.service';

@Component({
    selector: 'app-update-logged-user',
    templateUrl: './update-logged-user.component.html',
    styleUrls: ['./update-logged-user.component.scss']
})
export class UpdateLoggedUserComponent implements OnInit {

    employee: Employee = null;

    constructor(private employeeService: EmployeeServiceService,
                private notification: NotficationService,
                public dialogRef: MatDialogRef<UpdateLoggedUserComponent>,
                @Inject(MAT_DIALOG_DATA) public data
    ) {
    }

    ngOnInit(): void {
        this.employee = this.data;

        // Format date fields to yyyy-MM-dd
        this.employee.passeportValidityDate = this.formatDate(this.employee.passeportValidityDate);
        this.employee.visaValidateDate = this.formatDate(this.employee.visaValidateDate);

    }

    onSubmit() {
        const user = new User(
            this.employee.firstName,
            this.employee.lastName,
            this.employee.mobile,
            this.employee.email,
            this.employee.adresse,
            this.employee.passportNumber,
            this.employee.passeportValidityDate,
            this.employee.visaValidateDate
        );
        console.log(user);
        this.employeeService.updateEmployee(this.data.user_id, user).subscribe((data) => {

                this.notification.showSuccess('User Profile updated', 'ok');
                this.close();
            },
            err => {
                console.log(err);
            }
        );
    }

    formatDate(date: string): string {
        if (!date) {
            return null;
        }
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    close() {
        this.dialogRef.close();
    }
}
