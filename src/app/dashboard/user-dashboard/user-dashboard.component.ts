import { Component, OnInit } from '@angular/core';

import { UserService } from 'app/services/user/user.service'; 

import { User } from 'app/services/user/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css', '../dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll()
      .subscribe(
        users => {
          this.users = users;
        },
        err => {
          console.error(err);
        }
      )
  }

}
