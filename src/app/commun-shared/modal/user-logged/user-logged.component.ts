import { Component, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { Role } from 'src/app/model/role';
import { DialogConfigModalComponent } from '../dialog-config-modal/dialog-config-modal.component';
import { UpdateLoggedUserComponent } from '../update-logged-user/update-logged-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import { TeamService } from 'src/app/rest-service/team.service';
import { TypePercentage } from 'src/app/model/task';
import { AuthService } from 'src/app/rest-service/auth.service';
import { UserLoggedInteractionService } from 'src/app/shared/service/user-logged-interaction.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.scss']
})
export class UserLoggedComponent implements OnInit {
  public employee: Employee
  shown: boolean = false;
  addSkillForm: FormGroup
  submitted = false;
  selectedFiles;
  editPhoto: boolean;
  added: boolean = true
  progress: number;
  currentFileUpload: any;
  currentTime: number;
  hostPhoto: String = environment.urlConfig + `photoUser/`

  tasksdone: TypePercentage[] = [];

  constructor(public authService: AuthService, private notifyService: NotficationService, private interactionService: UserLoggedInteractionService, private employeeService: EmployeeServiceService, private teamService: TeamService, private notifService: NotficationService, private dialogConfig: DialogConfigModalComponent, private formBuilder: FormBuilder) { }



  ngOnInit(): void {

    this.employeeService.refreshNeeded.subscribe(() => {
      this.getUser();

    }
    )
    this.getUser();

    this.addSkillForm = this.formBuilder.group({
      roleLabel: ['', Validators.required],
      eval: ['', [Validators.required, Validators.max(100)]]
    });
    if (this.authService.isMember()) {
      this.taskDoneTeamMeber()
    }
  }
  url = 'assets/';

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.employeeService.uploadPhoto(this.currentFileUpload, this.employee.user_id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.currentTime = Date.now();
        this.editPhoto = false;
        var reader = new FileReader();
        reader.readAsDataURL(this.currentFileUpload);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.added = false

        }


        this.notifyService.showSuccess("congratulations!", "Photo aploaded");

      }
    }, err => {
      this.notifyService.showError("Fail!", "Photo could not be  aploaded");
    })



    this.selectedFiles = undefined







  }





  getUser() {
    this.employeeService.getlogged().subscribe(
      (data: Employee) => {

        this.employee = data;
        this.interactionService.sendUserLogged(this.employee);

      },
      err => {
        console.log(err)
      }
    );
  }
  getRole(l: Role[]) {

    return l.map(({ name }) => ` ${name}`).join(' & ')
  }
  get f() { return this.addSkillForm.controls; }

  showSkillForm() {

    this.shown = !this.shown
  }


  onSubmit() {

    this.submitted = true;
    if (this.addSkillForm.invalid) {
      return;
    } else {

      this.employeeService.adSkillsToUser(this.employee.user_id, this.addSkillForm.value).subscribe(
        data => {
          //    this.notifService.showSuccess("Skill added Successfully", "Done!");
          this.addSkillForm.reset()
          this.submitted = false;

          this.shown = !this.shown
        },
        err => {

          console.log('error');

        }
      );




    }

  }



  gotoChangeModel() {
    this.dialogConfig.implementUserLoggedUpdateDialog(this.employee, UpdateLoggedUserComponent, '700px', '770px')

  }
  formatDate(d: Date) {
    return moment(d).format('DD-MM-YYYY')
  }
  taskDoneTeamMeber() {
    this.teamService.taskDoneTeamMeber().subscribe(
      (data: TypePercentage[]) => {

        this.tasksdone = data;
      },
      err => {
        console.log(err)

      }


    );
  }
}
