import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading$ = this.spinnerService.loading$

  constructor(private spinnerService:SpinnerService) {
  }

  ngOnInit(): void {
  }

 

}
