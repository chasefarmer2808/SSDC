import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

import { AuthService } from '../services/auth/auth.service';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form on init', () => {
    expect(component.loginForm).toBeTruthy();
  })

  it('login form should be initially invalid', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should disable the submit button initially', () => {
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should require username field', () => {
    let usernameField = component.loginForm.controls['username'];
    expect(usernameField.errors['required']).toBeTruthy();
  });

  it('should require password field', () => {
    let passwordField = component.loginForm.controls['password'];
    expect(passwordField.errors['required']).toBeTruthy();
  });

  it('should have valid form when username and password are filled in', () => {
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
});
