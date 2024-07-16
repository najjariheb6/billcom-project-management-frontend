import {HttpClient} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {emailValidator} from 'src/app/commun-shared/validators/email-validator';
import {mobileValidator} from 'src/app/commun-shared/validators/mobile-validator';
import {Employee} from 'src/app/model/employee';
import {EmployeeServiceService} from 'src/app/rest-service/employee-service.service';
import {MustMatch} from 'src/app/scene/auth/update-password/update-password.component';
import {NotficationService} from 'src/app/shared/service/notfication.service';
import {Role} from 'src/app/model/role';
import {RoleService} from 'src/app/rest-service/role.service';

@Component({
    selector: 'app-new-employee', templateUrl: './new-employee.component.html', styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
    @Input() titleEmployee = 'Create Employee';
    registerForm: FormGroup;
    submitted = false;
    form: FormData;
    selectedFiles;
    currentFileUpload: any;
    added = true;
    role: string[];
    currentTime: any;
    list1: Role[];
    url = 'assets/';

    constructor(private formBuilder: FormBuilder, private employeeService: EmployeeServiceService, private roleService: RoleService, private notifyService: NotficationService, public dialogRef: MatDialogRef<NewEmployeeComponent>) {
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.getListOfRoles();
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobile: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), mobileValidator]],
            adresse: [''],
            email: ['', [Validators.required, emailValidator]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, MustMatch]],
            role: ['', Validators.required]

        }, {
            validator: MustMatch('password', 'confirmPassword')

        });


    }

    onSubmit() {

        this.submitted = true;
        if (this.registerForm.invalid) {
            return;


        } else {

            const employee = new Employee(this.registerForm.value.firstName,
                this.registerForm.value.lastName,
                this.registerForm.value.email,
                this.registerForm.value.mobile,
                this.registerForm.value.password,
                [this.registerForm.value.role],
                this.registerForm.value.adresse, );

            if (this.form != undefined) {
                this.employeeService.save(employee, this.form).subscribe(data => {

                    this.dialogRef.close();


                }, err => {

                    console.log(err);

                });
            } else {

                this.employeeService.saveWithoutPhoto(employee).subscribe(data => {

                    this.notifyService.showSuccess('Employee added successfully !!', 'Congratulations!');
                    this.dialogRef.close();


                }, err => {

                    console.log(err);

                });


            }


        }

    }

    onReset() {
        this.registerForm.reset();
    }

    getTS() {
        return this.currentTime;
    }

    onUploadFiles(files: File[]): void {


        this.form = null;
        let formData = new FormData();
        for (const file of files) {
            formData.append('file', file, file.name);
        }
        this.form = formData;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event: any) => {
            this.url = event.target.result;
        };


        this.added = false;


    }

    close() {
        this.dialogRef.close();
    }

    getListOfRoles() {
        this.roleService.getRoleList().subscribe(data => {
            console.log('data from api', data);
            this.list1 = data;

        });
    }
}





