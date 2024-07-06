import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dateValidator, dueDateValidator } from 'src/app/commun-shared/validators/date-validator';
import { ProjectService } from 'src/app/rest-service/project.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  hostPhoto: String = 'http://localhost:8080/photoUser/'
  @Input()
  titleUpdate : String = 'Update Project'
  constructor(public dialogRef: MatDialogRef<UpdateProjectComponent>, @Inject(MAT_DIALOG_DATA) public data, private notificationService: NotficationService, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (new Date(this.data.startedDate).getTime() < new Date().getTime()) {

      this.notificationService.showInfo('Started Date should be after current date', 'Attention!')
    }
    if (new Date(this.data.startedDate).getTime() > new Date(this.data.endDate).getTime()) {

      this.notificationService.showInfo('Endt date  should be after started date', 'Attention!')
    }
    else {
      this.projectService.updateProject(this.data).subscribe(() => {
        this.dialogRef.close()
      }, err => {
        console.log(err)
        //alert(err.message)          
      }
      );
    }

  }
  close(){
    this.dialogRef.close()

  }
}
