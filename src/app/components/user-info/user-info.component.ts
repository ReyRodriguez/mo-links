import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user: Readonly<User>;
  constructor() { }

  ngOnInit(): void {
  }

}
