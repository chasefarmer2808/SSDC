import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { UserDashboardComponent } from './user-dashboard.component';

import { UserService } from 'app/services/user/user.service';

import { User } from 'app/services/user/user';
import { UsersMock } from 'app/services/user/users.mock';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let de: DebugElement;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardComponent ],
      providers: [
        UserService
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

  it('should populate user data table', () => {
    let getAllSpy = spyOn(userService, 'getAll').and.returnValue(Observable.of(UsersMock));
    fixture.detectChanges();

    expect(component.usersDataSource.data).toEqual(UsersMock);
  });

  it('should return user by username', () => {
    let trueUser:User = UsersMock[0];
    fixture.detectChanges();
    component.usersDataSource.data = UsersMock;

    expect(component.getUserByUsername(trueUser.username)).toEqual(trueUser);
  });

  it('should return undefined if no user found', () => {
    fixture.detectChanges();

    expect(component.getUserByUsername('blah')).toBeUndefined();
  });
});
