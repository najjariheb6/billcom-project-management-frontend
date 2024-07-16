import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogConfigModalComponent} from 'src/app/commun-shared/modal/dialog-config-modal/dialog-config-modal.component';
import {Employee} from 'src/app/model/employee';
import {Role} from 'src/app/model/role';
import {Skill} from 'src/app/model/skill';
import {EmployeeServiceService} from 'src/app/rest-service/employee-service.service';
import {DialogconfirmService} from 'src/app/shared/service/dialogconfirm.service';
import {NotficationService} from 'src/app/shared/service/notfication.service';
import {SpinnerService} from 'src/app/shared/service/spinner.service';
import {EmployeeDetailComponent} from '../employee-detail/employee-detail.component';
import {EmployeeRoleUpdateComponent} from '../employee-role-update/employee-role-update.component';
import {NewEmployeeComponent} from '../new-employee/new-employee.component';


@Component({
    selector: 'app-employee-list', templateUrl: './employee-list.component.html', styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
    employees: Employee[] = [];
    selectedFiles;
    progress: number;
    currentFileUpload: any;
    currentTime: number;
    editPhoto: boolean;
    upload: boolean;
    employee: Employee;
    totalRecords: number;
    page = 1;
    skill: string;
    cle = 'id';
    reverse = false;

    constructor(public employeeService: EmployeeServiceService, private notifyService: NotficationService, private dialogService: DialogconfirmService, private modalComponent: DialogConfigModalComponent) {
    }

    ngOnInit() {

        this.employeeService.refreshNeeded.subscribe(() => {
            this.getList();

        });


        this.getList();

    }

    getList(): void {
        this.employeeService.liste().subscribe((data: Employee[]) => {
            this.employees = data;
            this.totalRecords = data.length;

        }, err => {
            console.log(err);
        });
    }

    //  get Role of list
    getRole(l: Role[]) {

        return l.map(({name}) => ` ${name}`).join('/');
    }


    goToAddEmployee() {
        this.modalComponent.implement(NewEmployeeComponent, '600px', '900px');


    }

    getDetails(id: number) {
        console.log('Employee ID:', id);
        this.modalComponent.implementDialogConfig(id, EmployeeDetailComponent, '500px', '530px');

    }

    OperationRole(id: number) {
        this.modalComponent.implementDialogConfig(id, EmployeeRoleUpdateComponent, '500px', '500px');

    }

    disableEmployee(id: number) {
        this.dialogService.openConfirmDialog('Are you sure to disable user?')
            .afterClosed().subscribe(res => {
            if (res) {
                this.employeeService.updateStatus(id, 0).subscribe(() => {
                    this.notifyService.showSuccess('ok!', 'Employee is disabled');
                });
            }
        });

    }

    enableEmployee(id: number) {
        this.employeeService.updateStatus(id, 1).subscribe(() => {
            this.notifyService.showSuccess('ok!', 'Employee is enabled');
        });

    }

    toggleEmployeeStatus(id: number, currentStatus: boolean) {
        const newStatus = currentStatus === true ? 0 : 1;
        const action = newStatus === 1 ? 'enabled' : 'disabled';

        this.dialogService.openConfirmDialog(`Are you sure to ${action} user?`)
            .afterClosed().subscribe(res => {
            if (res) {
                this.employeeService.updateStatus(id, newStatus).subscribe(() => {
                    this.notifyService.showSuccess('ok!', `Employee is ${action}`);
                });
            }
        });
    }

    updatePost(id: number) {
        this.modalComponent.implementDialogConfig(id, EmployeeRoleUpdateComponent, '400px', '600px');

    }

    public searchEmployees(key: string): void {
        const results: Employee[] = [];
        for (const employee of this.employees) {
            if (employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.mobile.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(employee);
            }
        }
        this.employees = results;
        if (results.length === 0 || !key) {
            this.getList();
        }
    }

    public searchBySkill(): void {
        const results: Employee[] = [];

        for (const employee of this.employees) {

            employee.skills.forEach((type1: Skill) => {

                if (type1.roleLabel.toLowerCase().indexOf(this.skill.toLowerCase()) !== -1) {
                    results.push(employee);

                }


            });
        }

        this.employees = results;
        if (results.length === 0 || !this.skill || this.skill == '') {
            this.skill = '';
            this.getList();
        }
    }

    sort(cle) {
        this.cle = cle;
        this.reverse = !this.reverse;

    }


    onSelectedFile(event) {
        this.selectedFiles = event.target.files;
    }

    update() {
        this.upload = true;
    }

    uploadPhoto(id: number) {
        this.progress = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.employeeService.uploadPhoto(this.currentFileUpload, id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                this.currentTime = Date.now();
                this.editPhoto = false;
                this.notifyService.showSuccess('congratulations!', 'Photo aploaded');

            }
        }, err => {
            this.notifyService.showError('Fail!', 'Photo could not be  aploaded');
        });


        this.selectedFiles = undefined;
    }

    getTS() {
        return this.currentTime;
    }

    LoggedUser() {
        return this.employeeService.getlogged().subscribe((data: Employee) => {

            this.employee = data;

        }, err => {
            this.notifyService.showError('Fail!', 'You should to be connected');

        });
    }


    deleteEmployee(id: number) {
        this.dialogService.openConfirmDialog('Are you sure to delete user?')
            .afterClosed().subscribe(res => {
            if (res) {
                this.employeeService.deleteUser(id, 0).subscribe(() => {
                    this.notifyService.showSuccess('ok!', 'Employee is delete');
                });
            }
        });


    }

}



