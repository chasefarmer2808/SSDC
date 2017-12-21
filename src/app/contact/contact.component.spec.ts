import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, NoConflictStyleCompatibilityMode } from '@angular/material';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContactComponent } from './contact.component';
import { OfficersComponent } from '../officers/officers.component';
import { EmailService } from '../services/email/email.service';
import { FacebookService } from '../services/facebook/facebook.service';

import { Officers } from '../services/officers/officers';
import { MockEvents } from '../events/events.mock';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let de: DebugElement;
  let officersComponent: OfficersComponent;
  let officersFixture: ComponentFixture<OfficersComponent>;
  let facebookService: FacebookService;
  let getEventsSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent, OfficersComponent ],
      imports: [ 
        HttpModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        NoConflictStyleCompatibilityMode,
        BrowserAnimationsModule
      ],
      providers: [EmailService, FacebookService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    officersFixture = TestBed.createComponent(OfficersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    officersComponent = officersFixture.componentInstance;

    facebookService = de.injector.get(FacebookService);

    getEventsSpy = spyOn(facebookService, 'getEvents')
                    .and.returnValue(Observable.of(MockEvents));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate officers component', () => {
    expect(officersComponent).toBeTruthy();
  });

  it('should show all officers', () => {
    expect(component.officers.length).toEqual(Officers.length);
  });

  it('email form should initially be invalid', () => {
    expect(component.emailForm.invalid).toBeTruthy();
  });

  it('should require email field', () => {
    let emailField = component.emailForm.controls['email'];
    expect(emailField.errors['required']).toBeTruthy();
  });

  it('should error on invalid email pattern', () => {
    let emailField = component.emailForm.controls['email'];

    emailField.setValue('invalid');

    expect(emailField.errors['pattern']).toBeTruthy();
  });

  it('should require first name field', () => {
    let firstNameField = component.emailForm.controls['firstName'];
    expect(firstNameField.errors['required']).toBeTruthy();
  });

  it('should require last name field', () => {
    let lastNameField = component.emailForm.controls['lastName'];
    expect(lastNameField.errors['required']).toBeTruthy();
  });

  it('should error on invalid first name pattern', () => {
    let firstNameField = component.emailForm.controls['firstName'];
    firstNameField.setValue('123');
    expect(firstNameField.errors['pattern']).toBeTruthy();
  });

  it('should error on invalid last name pattern', () => {
    let lastNameField = component.emailForm.controls['lastName'];
    lastNameField.setValue('123');
    expect(lastNameField.errors['pattern']).toBeTruthy();
  });

  it('should disable the submit button initially', () => {
    fixture.detectChanges();
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should have valid form on valid email, first name, and last name', () => {
    fixture.detectChanges();
    expect(component.emailForm.invalid).toBeTruthy();

    let emailField = component.emailForm.controls['email'];
    let firstNameField = component.emailForm.controls['firstName'];
    let lastNameField = component.emailForm.controls['lastName'];
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    
    emailField.setValue('test@test.com');
    firstNameField.setValue('Buzz');
    lastNameField.setValue('Aldrin');
    fixture.detectChanges();

    expect(component.emailForm.valid).toBeTruthy();
    expect(submitButton.disabled).toBeFalsy();
  });
});
