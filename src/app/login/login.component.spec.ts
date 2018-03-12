import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form should be initially invalid', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should require username field', () => {
    let usernameField = component.loginForm.controls['username'];
    expect(usernameField.errors['required']).toBeTruthy();
  });

  it('should require password field', () => {
    let passwordField = component.loginForm.controls['password'];
    expect(passwordField.errors['required']).toBeTruthy();
  });
});
