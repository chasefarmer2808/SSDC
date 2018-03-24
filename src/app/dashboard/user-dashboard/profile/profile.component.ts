import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { UserService } from 'app/services/user/user.service';

import { LoginValidators } from 'app/utility/login-validators';
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
  templateUrl: 'change-password-dialog.html',
  styleUrls: [
    '../../dashboard.component.css',
    '../../../app.component.css'
  ]
})
export class ChangePasswordDialog {
  changePasswordForm: FormGroup;
  loading: boolean = false;
  changePasswordSuccess: boolean;
  failMessage: string;
  
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    private userService: UserService) {
    this.createChangePasswordForm();
  }

  createChangePasswordForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      firstPassword: new FormControl('', Validators.required),
      secondPassword: new FormControl('', [Validators.required, LoginValidators.passwordMatch])
    });
  }

  updatePassword() {
    let oldPassword = this.changePasswordForm.get('oldPassword').value;
    let newPassword = this.changePasswordForm.get('firstPassword').value;
    this.loading = true;

    this.userService.updatePassword(oldPassword, newPassword)
      .subscribe(
        (res) => {
          this.loading = false;
          this.changePasswordSuccess = true;
        },
        (err) => {
          this.loading = false;
          this.changePasswordSuccess = false;
          this.failMessage = err.error;
        }
      )
  }
}
