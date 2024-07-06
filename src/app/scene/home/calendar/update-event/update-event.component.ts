import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/rest-service/event.service';
import { DialogconfirmService } from 'src/app/shared/service/dialogconfirm.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  show: boolean=false;
  public event: Event 
  constructor(private eventService: EventService,@Inject(MAT_DIALOG_DATA) public data,public dialogRef: MatDialogRef<any>, private  notifyService : NotficationService,private dialogService: DialogconfirmService) { }

  ngOnInit(): void {
    this.eventService.detail(this.data.id).subscribe(
      event => {
        this.event = event;
      }, err => {
        console.log('error')

      });
  }
  onSubmit(){
    this.show = true
  }
  formatDate(d: Date) {
    return moment(d).format('DD MMMM, h:mm a')
  }
 deleteEvent(){
  this.dialogService.openConfirmDialog('Are you sure to delete '+ this.data.title + ' event ?')
  .afterClosed().subscribe(res=>{
    if(res){
      this.eventService.deleteEventFromList(this.data.id,this.data).subscribe(
        () =>{
        
          this.notifyService.showSuccess("ok!","event Deleted");
          this.dialogRef.close()

        }
      );
    }
  })
 }


  close(){}
}
