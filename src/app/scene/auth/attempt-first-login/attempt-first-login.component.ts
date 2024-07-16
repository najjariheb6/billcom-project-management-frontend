import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MustMatch} from 'src/app/commun-shared/validators/password-validators';
import {PasswordUpdate} from 'src/app/model/passwordUpdate';
import {AuthService} from 'src/app/rest-service/auth.service';
import {NotficationService} from 'src/app/shared/service/notfication.service';
import {SubjectInServiceService} from '../subject-in-service.service';

@Component({
    selector: 'app-attempt-first-login',
    templateUrl: './attempt-first-login.component.html',
    styleUrls: ['./attempt-first-login.component.scss']
})
export class AttemptFirstLoginComponent implements OnInit {
    public updatePasswordForm: FormGroup;
    submitted: boolean;
    data: string[] = [];
    model: PasswordUpdate = null;

    constructor(private _formBuilder: FormBuilder,
                private authService: AuthService,
                private _router: Router,
                private subjectService: SubjectInServiceService,
                private notifyService: NotficationService) {
    }

    get f() {
        return this.updatePasswordForm.controls;
    }


    ngOnInit(): void {
        this.updatePasswordForm = this._formBuilder.group({
            password: ['', [Validators.required]], newPassword: ['', [Validators.required]], confirmPassword: ['', Validators.required],
        }, {
            validator: MustMatch('newPassword', 'confirmPassword')
        });
        this.subjectService.currentData.subscribe((e) => this.data.push(e));
    }

    onSubmit = () => {
        this.submitted = true;

        this.submitted = true;
        if (this.updatePasswordForm.invalid) {
            return;
        } else {
            const passwordUpdateModel = new PasswordUpdate(this.data[0],
                this.updatePasswordForm.value.password, this.updatePasswordForm.value.newPassword, );
            this.authService.updatePasswordAttemptFirstLogin(passwordUpdateModel).subscribe(data => {
                this.notifyService.showSuccess('your password is updated,you can connect now', 'ok');
                this._router.navigateByUrl('/login');
            }, err => {
                console.log(err);
            });
        }
    }

}
