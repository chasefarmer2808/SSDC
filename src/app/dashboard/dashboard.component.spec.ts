import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/modules/material.module';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { UserService } from 'app/services/user/user.service';

import { routes } from 'app/app-routing/app-routes';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
      ],
      providers: [ UserService ],
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
