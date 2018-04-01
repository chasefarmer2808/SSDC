import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'app/modules/material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileComponent, ChangePasswordDialog } from './profile.component';

import { UserService } from 'app/services/user/user.service';


describe('ProfileComponent', () => {
  let profileComponent: ProfileComponent;
  let profileFixture: ComponentFixture<ProfileComponent>;
  let changePasswordDialogFixture: ComponentFixture<ChangePasswordDialog>;
  let changePasswordDialogComponent: ChangePasswordDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, ChangePasswordDialog ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        UserService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, 
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    profileFixture = TestBed.createComponent(ProfileComponent);
    profileComponent = profileFixture.componentInstance;
    changePasswordDialogFixture = TestBed.createComponent(ChangePasswordDialog);
    changePasswordDialogComponent = changePasswordDialogFixture.componentInstance;
  });

  it('should create', () => {
    expect(profileComponent).toBeTruthy();
  });

  it('should create change password component', () => {
    expect(changePasswordDialogComponent).toBeTruthy();
  });

  it('should create change password form on init', () => {
    expect(changePasswordDialogComponent.changePasswordForm).toBeTruthy();
  });

  it('form should be initially invalid', () => {
    changePasswordDialogFixture.detectChanges();
    expect(changePasswordDialogComponent.changePasswordForm.invalid).toBeTruthy();
  });

  it('should disable submit button initally', () => {
    changePasswordDialogFixture.detectChanges();
    let submitButton = changePasswordDialogFixture.nativeElement.querySelector('.submit-button');
  });

  it('should require old password field', () => {
    let oldPasswordField = changePasswordDialogComponent.changePasswordForm.controls['oldPassword'];
    expect(oldPasswordField.errors['required']).toBeTruthy();
  });

  it('should require new password field', () => {
    let firstPasswordField = changePasswordDialogComponent.changePasswordForm.controls['firstPassword'];
    expect(firstPasswordField.errors['required']).toBeTruthy();
  });

  it('should require second new password field', () => {
    let secondPasswordField = changePasswordDialogComponent.changePasswordForm.controls['secondPassword'];
    expect(secondPasswordField.errors['required']).toBeTruthy();
  });

  it('should have mismatch error if passwords do not match', () => {
    let firstPasswordField = changePasswordDialogComponent.changePasswordForm.controls['firstPassword'];
    let secondPasswordField = changePasswordDialogComponent.changePasswordForm.controls['secondPassword'];

    firstPasswordField.setValue('test');
    secondPasswordField.setValue('nottest');

    changePasswordDialogFixture.detectChanges();

    expect(secondPasswordField.errors['mismatch']).toBeTruthy();
  });

  it('should not have mismatch error if passwords do not match', () => {
    let firstPasswordField = changePasswordDialogComponent.changePasswordForm.controls['firstPassword'];
    let secondPasswordField = changePasswordDialogComponent.changePasswordForm.controls['secondPassword'];
    
    firstPasswordField.setValue('test');
    secondPasswordField.setValue('test');

    changePasswordDialogFixture.detectChanges();

    expect(secondPasswordField.valid).toBeTruthy();
  });

  it('should have valid login form when all fields are valid', () => {
    changePasswordDialogFixture.detectChanges();
    expect(changePasswordDialogComponent.changePasswordForm.invalid).toBeTruthy();

    let oldPasswordField = changePasswordDialogComponent.changePasswordForm.controls['oldPassword'];
    let firstPasswordField = changePasswordDialogComponent.changePasswordForm.controls['firstPassword'];
    let secondPasswordField = changePasswordDialogComponent.changePasswordForm.controls['secondPassword'];

    oldPasswordField.setValue('test');
    firstPasswordField.setValue('newTest');
    secondPasswordField.setValue('newTest');
    changePasswordDialogFixture.detectChanges();

    expect(changePasswordDialogComponent.changePasswordForm.valid).toBeTruthy();
  });
});
