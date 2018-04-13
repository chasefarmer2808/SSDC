import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { UserService } from 'app/services/user/user.service'; 
import { AuthService } from 'app/services/auth/auth.service';

import { ProfileComponent } from 'app/dashboard/user-dashboard/profile/profile.component';

import { User } from 'app/services/user/user';
import { ROLES } from 'app/services/user/roles';
import { GenericSet } from 'app/utility/generic-set';
import { UserDataSource } from 'app/services/user/user-data-source';

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
  usersDataSource: UserDataSource;
  roleOptions: Array<string> = [];
  usersToUpdate: GenericSet<User>;
  currentUser: User;
  changedRows: SelectionModel<User>;
  selectedRows: SelectionModel<User>;
  dataLoading: boolean = true;
  dataSaving: boolean = false;
  deleting: boolean = false;
  saveSuccess: boolean;
  sessionIsAdmin: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService) {
    this.usersToUpdate = new Set<User>();
    this.changedRows = new SelectionModel<User>(true, []);
    this.selectedRows = new SelectionModel<User>(true, []);
  }

  ngOnInit() {
    this.currentUser = this.authService.getSessionUser()
    this.usersDataSource = new UserDataSource(this.userService, this.currentUser.username);
    this.usersDataSource.loadUsers();
    this.roleOptions = this.objectToValueArray(ROLES);
    this.sessionIsAdmin = this.authService.hasRole(ROLES.ADMIN);
    this.determineSelectColumn();
  }

  updateChangeList(username: string) {
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
          this.saveSuccess = true;
          this.usersToUpdate.clear();
          this.changedRows.clear();
        },
        (err) => {
          this.dataSaving = false;
          this.saveSuccess = false;
          console.log(err);
        }
      )
  }

  deleteSelectedUsers() {
    this.deleting = true;
    this.userService.deleteUserMany(this.selectedRows.selected)
      .subscribe(
        (res) => {
          this.deleting = false;
          this.usersDataSource.loadUsers();
          this.selectedRows.clear();
          console.log(res);
        },
        (err) => {
          this.deleting = false;
          console.log(err);
        }
      );
  }

  public objectToValueArray(object): Array<any> {
    let values = [];
    Object.keys(object).forEach(key => {
      values.push(object[key]);
    });

    return values;
  }

  public getUserByUsername(username: string):User {

    for (let user of this.usersDataSource.getUsers()) {
      if (user.username === username) {
        return user;
      }
    }

    return undefined;
  }

  public getSelf(): User {
    let currentUsername = this.authService.getSessionUsername();
  
    return this.getUserByUsername(currentUsername);
  }

  private removeUserByUsername(users: User[], username: string) {
    for (let i in users) {
      let user = users[i];
      if (user.username === username) {
        users.splice(+i, 1);
      }
    }
  }

  private determineSelectColumn() {
    if (this.sessionIsAdmin) {
      this.columnsToDisplay.push('select');
    }
  }
}
