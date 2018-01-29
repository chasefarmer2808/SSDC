import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';

import { MaterialModule } from '../modules/material.module';
import { TeamsComponent } from './teams.component';
import { TeamsService } from '../services/teams/teams.service';
import { TeamsMock } from '../services/teams/teams.mock';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let teamsService: TeamsService;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsComponent ],
      imports: [ 
        HttpModule,
        RouterTestingModule,
        MaterialModule 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({})
          }
        },
        TeamsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    teamsService = de.injector.get(TeamsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if empty object', () => {
    let testObj = {};

    expect(component.isEmpty(testObj)).toBeTruthy();
  });

  it('should return false of non-empty object', () => {
    let testObj = {
      dummp: 'dummy'
    };

    expect(component.isEmpty(testObj)).toBeFalsy();
  });
});
