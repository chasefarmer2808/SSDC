import { Component, OnInit } from '@angular/core';

import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.createUser();
  }

  createUser() {
    this.userService.createUser({username: 'bob', password: 'abcd'})
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
