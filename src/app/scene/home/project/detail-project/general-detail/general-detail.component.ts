import { Component, Input, OnInit } from '@angular/core';
import { ProjectList } from 'src/app/model/project';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-general-detail',
  templateUrl: './general-detail.component.html',
  styleUrls: ['./general-detail.component.scss']
})
export class GeneralDetailComponent implements OnInit {
  hostPhoto: String = environment.urlConfig  + `photoUser/`
  @Input()
  project: ProjectList =null;
  i :number =-1;
  constructor() { }

  ngOnInit(): void {
  }

}
