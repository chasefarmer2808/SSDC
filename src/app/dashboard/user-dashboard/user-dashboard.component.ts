import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { UserService } from 'app/services/user/user.service'; 

import { User } from 'app/services/user/user';
import { ROLES } from 'app/services/user/roles';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: [
    './user-dashboard.component.css', 
    '../dashboard.component.css',
    '../../app.component.css'
  ]
})
export class UserDashboardComponent implements OnInit {
  columnsToDisplay: Array<string> = ['username', 'role'];
  usersDataSource: MatTableDataSource<User>;
  roleOptions: Array<string> = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.usersDataSource = new MatTableDataSource();
    this.roleOptions = this.objectToValueArray(ROLES);
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

  public objectToValueArray(object): Array<any> {
    let values = [];
    Object.keys(object).forEach(key => {
      values.push(object[key]);
    });

    return values;
  }

}
