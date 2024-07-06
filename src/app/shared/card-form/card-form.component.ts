import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
  @Input()
  title : String;
  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close()
}
}
