import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';

import { UserDashboardComponent } from './user-dashboard.component';

import { UserService } from 'app/services/user/user.service';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardComponent ],
      providers: [
        UserService
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
