import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContactComponent } from './contact.component';
import { EmailService } from '../services/email/email.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ 
        HttpModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ],
      providers: [EmailService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should disable the submit button initially', () => {
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should have valid form on valid email', () => {
    expect(component.emailForm.invalid).toBeTruthy();

    let emailField = component.emailForm.controls['email'];
    let submitButton = fixture.nativeElement.querySelector('.submit-button');
    
    emailField.setValue('test@test.com');
    fixture.detectChanges();

    expect(component.emailForm.valid).toBeTruthy();
    expect(submitButton.disabled).toBeFalsy();
  });
});
