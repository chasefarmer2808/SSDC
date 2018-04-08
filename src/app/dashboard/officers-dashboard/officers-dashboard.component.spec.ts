import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OfficersService } from 'app/services/officers/officers.service';

import { ImgFormControlComponent } from 'app/dashboard/officers-dashboard/imgformcontrol/imgformcontrol.component';
import { StatusMessageComponent } from 'app/status-message/status-message.component';
import { OfficersDashboardComponent, OfficerDialog } from './officers-dashboard.component';

describe('OfficersDashboardComponent', () => {
  let component: OfficersDashboardComponent;
  let fixture: ComponentFixture<OfficersDashboardComponent>;
  let officerDialog: OfficerDialog;
  let officerDialogFixture: ComponentFixture<OfficerDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OfficersDashboardComponent, 
        OfficerDialog, 
        StatusMessageComponent,
        ImgFormControlComponent 
      ],
      providers: [ 
        OfficersService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, 
          useValue: {}
        }
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficersDashboardComponent);
    component = fixture.componentInstance;
    officerDialogFixture = TestBed.createComponent(OfficerDialog);
    officerDialog = officerDialogFixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create add officer form on init', () => {
    expect(officerDialog.officerForm).toBeTruthy();
  });

  it('form should be initially invalid', () => {
    officerDialogFixture.detectChanges();
    expect(officerDialog.officerForm.invalid).toBeTruthy();
  });

  it('should require first name field', () => {
    let firstNameField = officerDialog.officerForm.controls['firstName'];
    expect(firstNameField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for input with numbers', () => {
    let firstNameField = officerDialog.officerForm.controls['firstName'];
    firstNameField.setValue('123');
    expect(firstNameField.errors['pattern']).toBeTruthy();
  });

  it('should require last name field', () => {
    let lastNameField = officerDialog.officerForm.controls['lastName'];
    expect(lastNameField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for input with numbers', () => {
    let lastNameField = officerDialog.officerForm.controls['lastName'];
    lastNameField.setValue('123');
    expect(lastNameField.errors['pattern']).toBeTruthy();
  });

  it('should require role field', () => {
    let roleField = officerDialog.officerForm.controls['role'];
    expect(roleField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for input with numbers', () => {
    let roleField = officerDialog.officerForm.controls['role'];
    roleField.setValue('123');
    expect(roleField.errors['pattern']).toBeTruthy();    
  });

  it('should require email address field', () => {
    let emailField = officerDialog.officerForm.controls['emailAddress'];
    expect(emailField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for invalid email', () => {
    let emailField = officerDialog.officerForm.controls['emailAddress'];
    emailField.setValue('not an email address');
    expect(emailField.errors['pattern']).toBeTruthy();    
  });

  it('bio field should be valid', () => {
    let bioField = officerDialog.officerForm.controls['bio'];
    expect(bioField.valid).toBeTruthy();
  });

  it('should require photo field', () => {
    let photoUriField = officerDialog.officerForm.controls['photoUri'];
    expect(photoUriField.errors['required']).toBeTruthy();
  });
});
