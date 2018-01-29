import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';

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
        RouterTestingModule 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({name: 'test'})
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

  it('should call getTeams function on component init', async(() => {
    spyOn(component, 'getTeams');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.getTeams).toHaveBeenCalled();
    });
  }));

  it('should get teams from teams service', async(() => {
    spyOn(teamsService, 'getTeams')
      .and.returnValue(Observable.of(TeamsMock));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.teams.length).toEqual(TeamsMock.length);
    }); 
  }))
});
