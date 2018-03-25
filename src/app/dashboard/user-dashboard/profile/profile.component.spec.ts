import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'app/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileComponent, ChangePasswordDialog } from './profile.component';

import { UserService } from 'app/services/user/user.service';


describe('ProfileComponent', () => {
  let profileComponent: ProfileComponent;
  let profileFixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, ChangePasswordDialog ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    profileFixture = TestBed.createComponent(ProfileComponent);
    profileComponent = profileFixture.componentInstance;
  });

  it('should create', () => {
    expect(profileComponent).toBeTruthy();
  });
});
