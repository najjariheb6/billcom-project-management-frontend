import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/rest-service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public authService : AuthService) { }

  ngOnInit(): void {
  }

}
