import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { OfficersService } from 'app/services/officers/officers.service';

import { StatusMessageComponent } from 'app/status-message/status-message.component';
import { OfficersDashboardComponent, AddOfficerDialog } from './officers-dashboard.component';

describe('OfficersDashboardComponent', () => {
  let component: OfficersDashboardComponent;
  let fixture: ComponentFixture<OfficersDashboardComponent>;
  let addOfficerComponent: AddOfficerDialog;
  let addOfficerFixture: ComponentFixture<AddOfficerDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficersDashboardComponent, AddOfficerDialog, StatusMessageComponent ],
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
    addOfficerFixture = TestBed.createComponent(AddOfficerDialog);
    addOfficerComponent = addOfficerFixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create add officer form on init', () => {
    expect(addOfficerComponent.addOfficerForm).toBeTruthy();
  });

  it('form should be initially invalid', () => {
    addOfficerFixture.detectChanges();
    expect(addOfficerComponent.addOfficerForm.invalid).toBeTruthy();
  });

  it('should require first name field', () => {
    let firstNameField = addOfficerComponent.addOfficerForm.controls['firstName'];
    expect(firstNameField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for input with numbers', () => {
    let firstNameField = addOfficerComponent.addOfficerForm.controls['firstName'];
    firstNameField.setValue('123');
    expect(firstNameField.errors['pattern']).toBeTruthy();
  });

  it('should require last name field', () => {
    let lastNameField = addOfficerComponent.addOfficerForm.controls['lastName'];
    expect(lastNameField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for input with numbers', () => {
    let lastNameField = addOfficerComponent.addOfficerForm.controls['lastName'];
    lastNameField.setValue('123');
    expect(lastNameField.errors['pattern']).toBeTruthy();
  });

  it('should require role field', () => {
    let roleField = addOfficerComponent.addOfficerForm.controls['role'];
    expect(roleField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for input with numbers', () => {
    let roleField = addOfficerComponent.addOfficerForm.controls['role'];
    roleField.setValue('123');
    expect(roleField.errors['pattern']).toBeTruthy();    
  });

  it('should require email address field', () => {
    let emailField = addOfficerComponent.addOfficerForm.controls['emailAddress'];
    expect(emailField.errors['required']).toBeTruthy();
  });

  it('should get pattern error for invalid email', () => {
    let emailField = addOfficerComponent.addOfficerForm.controls['emailAddress'];
    emailField.setValue('not an email address');
    expect(emailField.errors['pattern']).toBeTruthy();    
  });

  it('bio field should be valid', () => {
    let bioField = addOfficerComponent.addOfficerForm.controls['bio'];
    expect(bioField.valid).toBeTruthy();
  });

  it('should require photo field', () => {
    let photoField = addOfficerComponent.addOfficerForm.controls['photo'];
    expect(photoField.errors['required']).toBeTruthy();
  });
});
