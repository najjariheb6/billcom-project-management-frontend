import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dateValidator, dueDateValidator } from 'src/app/commun-shared/validators/date-validator';
import { EventService } from 'src/app/rest-service/event.service';
import { WebSocketNotificationService } from 'src/app/rest-service/web-socket-notification.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import { NotifInteractionService } from 'src/app/shared/service/notif-interaction.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup
  submitted = false;

  constructor(public webNotifSocket :WebSocketNotificationService ,public dialogRef: MatDialogRef<any>, private notifInteraction : NotifInteractionService ,private formBuilder: FormBuilder,private notifyService: NotficationService,private eventService: EventService,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', [Validators.required,dateValidator]],
      end: ['', [Validators.required,dueDateValidator]],

    }, {
      validator: [dueDateValidator('start','end'),
       dateValidator('start')]
     

    }, 

    );






  }
  
  close() {
    this.dialogRef.close();

  }
  get  f() { return this.eventForm.controls; }
  onSubmit() {

    this.submitted = true;
  
    if (this.eventForm.invalid){
      return ;
    } else {
  
  
      this.eventService.save(this.data, this.eventForm.value).subscribe(
        data => {
            this.notifyService.showSuccess("Event added successfully !!", "Congratulations!")
            this.dialogRef.close()


        },
        err => {

            console.log(err);

        }
    );
    }
  
  
  
  
  
  
  }

}
