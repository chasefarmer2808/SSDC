import { Component, OnInit, Input } from '@angular/core';

import { User } from 'app/services/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user: User;

  menuItems: Array<any> = [
    {
      name: 'Change Password'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
