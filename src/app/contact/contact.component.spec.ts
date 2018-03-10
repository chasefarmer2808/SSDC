import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, NoConflictStyleCompatibilityMode } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContactComponent } from './contact.component';
import { EmailService } from '../services/email/email.service';
import { FacebookService } from '../services/facebook/facebook.service';
import { OfficersService } from '../services/officers/officers.service';

import { EventsMock } from '../events/events.mock';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let de: DebugElement;
  let facebookService: FacebookService;
  let officersService: OfficersService;
  let emailService: EmailService;
  let getEventsSpy: any;
  let sendEmailSpy: any;

  function fillInFormCorrectly() {
    let emailField = component.emailForm.controls['email'];
    let firstNameField = component.emailForm.controls['firstName'];
    let lastNameField = component.emailForm.controls['lastName'];
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    let listservButton = fixture.nativeElement.querySelector('#listserv-button');
    
    emailField.setValue('test@test.com');
    firstNameField.setValue('Buzz');
    lastNameField.setValue('Aldrin');
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ 
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        NoConflictStyleCompatibilityMode,
        BrowserAnimationsModule
      ],
      providers: [EmailService, OfficersService, FacebookService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    facebookService = de.injector.get(FacebookService);
    officersService = de.injector.get(OfficersService);
    emailService = de.injector.get(EmailService);

    getEventsSpy = spyOn(facebookService, 'getEvents')
                    .and.returnValue(Observable.of(EventsMock));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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

  it('should disable the listserv submit button initially', () => {
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#listserv-button');
    expect(button.disabled).toBeTruthy();
  });

  it('should have valid form on valid email, first name, and last name', () => {
    fixture.detectChanges();
    expect(component.emailForm.invalid).toBeTruthy();

    let emailField = component.emailForm.controls['email'];
    let firstNameField = component.emailForm.controls['firstName'];
    let lastNameField = component.emailForm.controls['lastName'];
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    let listservButton = fixture.nativeElement.querySelector('#listserv-button');
    
    emailField.setValue('test@test.com');
    firstNameField.setValue('Buzz');
    lastNameField.setValue('Aldrin');
    fixture.detectChanges();

    expect(component.emailForm.valid).toBeTruthy();
    expect(submitButton.disabled).toBeFalsy();
    expect(listservButton.disabled).toBeFalsy();
  });

  it('should set error flag to true when service returns error on email', async(() => {
    fixture.detectChanges()
    sendEmailSpy = spyOn(emailService, 'sendEmail')
                    .and.returnValue(Observable.throw(new Error()));

    fillInFormCorrectly();

    component.submitEmail();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.emailLoading).toBeFalsy();
      expect(component.emailError).toBeTruthy();
    });
  }));

  it('should set error flag to true when service returns error on listserv', async(() => {
    fixture.detectChanges()
    sendEmailSpy = spyOn(emailService, 'addUserToListserv')
                    .and.returnValue(Observable.throw(new Error()));

    fillInFormCorrectly();

    component.addUserToListserv();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.listservLoading).toBeFalsy();
      expect(component.listservError).toBeTruthy();
    });
  }));
});
