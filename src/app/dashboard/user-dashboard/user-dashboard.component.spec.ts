import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { UserDashboardComponent } from './user-dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { UserService } from 'app/services/user/user.service';
import { AuthService } from 'app/services/auth/auth.service';

import { User } from 'app/services/user/user';
import { UsersMock } from 'app/services/user/users.mock';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let de: DebugElement;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UserDashboardComponent,
        ProfileComponent 
      ],
      providers: [
        UserService,
        AuthService
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userService = de.injector.get(UserService);
    authService = de.injector.get(AuthService);

    spyOn(authService, 'getSessionUser').and.returnValue(new User('test', 'test'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return array of string values from input object', () => {
    let testObj = {
      a: 'test1',
      b: 'test2',
      c: 'test3'
    }
    let expectedResult = ['test1', 'test2', 'test3'];

    let testResult = component.objectToValueArray(testObj);
    expect(expectedResult).toEqual(testResult);
  });

  it('should add only unique users to set', () => {
    let user1 = new User('test', 'test');

    component.usersToUpdate.add(user1);
    component.usersToUpdate.add(user1);

    expect(component.usersToUpdate.size).toEqual(1);
  });

  it('should call UserService getAll on init', () => {
    let getAllSpy = spyOn(userService, 'getAll').and.callThrough();
    fixture.detectChanges();

    expect(getAllSpy).toHaveBeenCalled();
  });

  it('should check the role of the session user on init', () => {
    let hasRoleSpy = spyOn(authService, 'hasRole').and.callThrough();
    fixture.detectChanges();

    expect(hasRoleSpy).toHaveBeenCalled();
  });

  it('should set currentUser with session user', () => {
    fixture.detectChanges();
    expect(component.currentUser.username).toEqual('test');
  });

  it('should populate user data table', () => {
    let getAllSpy = spyOn(userService, 'getAll').and.returnValue(Observable.of(UsersMock));
    fixture.detectChanges();

    expect(component.usersDataSource.getUsers()).toEqual(UsersMock);
  });

  it('should return user by username', () => {
    let trueUser:User = UsersMock[0];
    let getAllSpy = spyOn(userService, 'getAll').and.returnValue(Observable.of(UsersMock));
    fixture.detectChanges();

    expect(component.getUserByUsername(trueUser.username)).toEqual(trueUser);
  });

  it('should return undefined if no user found', () => {
    fixture.detectChanges();

    expect(component.getUserByUsername('blah')).toBeUndefined();
  });
});
