import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/commun-shared/validators/email-validator';
import { Employee } from 'src/app/model/employee';
import { AuthService } from 'src/app/rest-service/auth.service';
import { SubjectInServiceService } from '../subject-in-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  employee: Employee
  test: boolean = true
  attemptFisrt: boolean = true
  loginUserData = {};
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private _router: Router, private subjectService: SubjectInServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      //   email: ['', [Validators.required, Validators.pattern("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")]],
      email: ['', [Validators.required/*,emailValidator*/]],
      password: ['', [Validators.required]]
    }
    );
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this._auth.isFirstAttemptUser(this.loginForm.value.email).subscribe(data => {


        this.attemptFisrt = data

        if (this.attemptFisrt == false) {
          this.subjectService.updateData(this.loginForm.value.email);
          this._router.navigateByUrl('/firstLogin');
        } else {
          this._auth.login(this.loginForm.value)
            .subscribe(resp => {
              let jwt = resp.headers.get('Authorization');
              this._auth.SaveToken(jwt);
              this._router.navigateByUrl('/home');

            },

              err => {
                this.onReset()
              })
        }
      })


    }

  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}



