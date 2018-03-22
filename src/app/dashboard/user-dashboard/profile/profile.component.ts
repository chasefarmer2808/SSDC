import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

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
      name: 'Change Password',
      action: this.openChangePasswordDialog.bind(this)
    }
  ];

  constructor(private passwordDialog: MatDialog) { }

  ngOnInit() {
  }

  openChangePasswordDialog() {
    let dialogRef = this.passwordDialog.open(ChangePasswordDialog);
  }

}

@Component({
  selector: 'change-password-dialog',
  templateUrl: 'change-password-dialog.html'
})
export class ChangePasswordDialog {
  constructor(public dialogRef: MatDialogRef<ChangePasswordDialog>) {}
}
