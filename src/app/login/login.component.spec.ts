import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

import { AuthService } from '../services/auth/auth.service';
import { UserService } from 'app/services/user/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ 
        AuthService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    authService = de.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  }));

  it('should create login form on init', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.loginForm).toBeTruthy();
    });
  }));

  it('should create signup form on init', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.signUpForm).toBeTruthy();
    });
  }));

  it('login form should be initially invalid', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.loginForm.invalid).toBeTruthy();
    });
  }));

  it('should disable the login submit button initially', async(() => {
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    expect(submitButton.disabled).toBeTruthy();
  }));

  it('should require login username field', () => {
    let usernameField = component.loginForm.controls['username'];
    expect(usernameField.errors['required']).toBeTruthy();
  });

  it('should require login password field', () => {
    let passwordField = component.loginForm.controls['password'];
    expect(passwordField.errors['required']).toBeTruthy();
  });

  it('should have valid login form when username and password are filled in', () => {
    expect(component.loginForm.invalid).toBeTruthy();

    let usernameField = component.loginForm.controls['username'];
    let passwordField = component.loginForm.controls['password'];
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    
    usernameField.setValue('dummy');
    passwordField.setValue('dummy-password');
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTruthy();
    expect(submitButton.disabled).toBeFalsy();
  });

  it('signUp form should be initially invalid', () => {
    expect(component.signUpForm.invalid).toBeTruthy();
  });

  it('should not show signup form initially', () => {
    let signUpForm = fixture.nativeElement.querySelector('#sign-up-form');
    expect(signUpForm).toBeNull();
  });

  it('should require signup username field', () => {
    let usernameField = component.signUpForm.controls['username'];
    expect(usernameField.errors['required']).toBeTruthy();
  });

  it('should require signup first password field', () => {
    let firstPasswordField = component.signUpForm.controls['firstPassword'];
    expect(firstPasswordField.errors['required']).toBeTruthy();
  });

  it('should require signup second password field', () => {
    let secondPasswordField = component.signUpForm.controls['secondPassword'];
    expect(secondPasswordField.errors['required']).toBeTruthy();
  });

  it('should show signup form on toggle', async(() => {
    let signUpForm = fixture.nativeElement.querySelector('#sign-up-form');
    expect(signUpForm).toBeNull();

    component.toggleSignUpForm();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      signUpForm = fixture.nativeElement.querySelector('#sign-up-form');
      expect(signUpForm).toBeTruthy();
    });

  }));

  it('should create mismatch error when passwords do not match', () => {
    let firstPasswordField = component.signUpForm.controls['firstPassword'];
    let secondPasswordField = component.signUpForm.controls['secondPassword'];

    component.toggleSignUpForm();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      firstPasswordField.setValue('test');
      secondPasswordField.setValue('test1');
      fixture.detectChanges();

      expect(secondPasswordField.errors['mismatch']).toBeTruthy();
    });
  });

  it('should have valid signup form when all fields are filled in', () => {
    expect(component.signUpForm.invalid).toBeTruthy();

    let usernameField = component.signUpForm.controls['username'];
    let firstPasswordField = component.signUpForm.controls['firstPassword'];
    let secondPasswordField = component.signUpForm.controls['secondPassword'];
    let submitButton;

    component.toggleSignUpForm();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      usernameField.setValue('dummy');
      firstPasswordField.setValue('dummy-password');
      secondPasswordField.setValue('dummy-password');
      fixture.detectChanges();

      submitButton = fixture.nativeElement.querySelector('.signup-button');
  
      expect(component.signUpForm.valid).toBeTruthy();
      expect(submitButton.disabled).toBeFalsy();
    });
  });

});
