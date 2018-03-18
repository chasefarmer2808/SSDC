import { Component, OnInit } from '@angular/core';
import {MatTableDataSource } from '@angular/material';

import { UserService } from 'app/services/user/user.service'; 

import { User } from 'app/services/user/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css', '../dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  users: User[];
  columnsToDisplay: Array<string> = ['username'];
  usersDataSource: MatTableDataSource<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.usersDataSource = new MatTableDataSource();
    this.userService.getAll()
      .subscribe(
        users => {
          this.usersDataSource.data = users;
        },
        err => {
          console.error(err);
        }
      )
  }

}
