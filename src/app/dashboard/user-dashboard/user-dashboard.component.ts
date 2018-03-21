import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { UserService } from 'app/services/user/user.service'; 
import { AuthService } from 'app/services/auth/auth.service';

import { User } from 'app/services/user/user';
import { ROLES } from 'app/services/user/roles';
import { GenericSet } from 'app/utility/generic-set';

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
  usersToUpdate: GenericSet<User>;
  changedRows: SelectionModel<User>;
  dataLoading: boolean = true;
  dataSaving: boolean = false;
  sessionIsAdmin: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService) {
    this.usersToUpdate = new Set<User>();
    this.changedRows = new SelectionModel<User>(true, []);
  }

  ngOnInit() {
    this.usersDataSource = new MatTableDataSource();
    this.roleOptions = this.objectToValueArray(ROLES);
    this.sessionIsAdmin = this.authService.hasRole(ROLES.ADMIN);
    this.userService.getAll()
      .subscribe(
        users => {
          this.usersDataSource.data = users;
          this.dataLoading = false;
        },
        err => {
          console.error(err);
        }
      )
  }

  updateChangeList(username: string, role: string) {
    let user = this.getUserByUsername(username);
    if (user) {
      this.usersToUpdate.add(user);
      this.updateChangeRow(user);
    }
  }

  updateChangeRow(user: User) {
    this.changedRows.select(user);
  }

  saveChanges() {
    this.dataSaving = this.usersToUpdate.size > 0;
    this.userService.updateRoleMany(this.usersToUpdate)
      .subscribe(
        (res) => {
          console.log(res);
          this.dataSaving = false;
          this.usersToUpdate.clear();
          this.changedRows.clear();
        },
        (err) => {
          this.dataSaving = false;
          console.log(err);
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

  public getUserByUsername(username: string):User {

    for (let user of this.usersDataSource.data) {
      if (user.username === username) {
        return user;
      }
    }

    return undefined;
  }
}
