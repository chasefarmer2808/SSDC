import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'app/modules/material.module';

import { ProfileComponent, ChangePasswordDialog } from './profile.component';

describe('ProfileComponent', () => {
  let profileComponent: ProfileComponent;
  let profileFixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, ChangePasswordDialog ],
      imports: [
        MaterialModule
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
