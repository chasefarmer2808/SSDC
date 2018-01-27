import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TeamsService } from './teams.service';
import { Team } from './team';
import { TeamsMock } from './teams.mock';

describe('TeamsService', () => {

  let serviceInstance:TeamsService;
  let getTeamsSpy:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsService],
      imports: [ HttpModule ]
    });

    serviceInstance = TestBed.get(TeamsService);

  });

  it('should be created', () => {
    expect(serviceInstance).toBeTruthy();
  });

  it('should get all teams', () => {
    getTeamsSpy = spyOn(serviceInstance, 'getTeams')
                  .and.returnValue(Observable.of(TeamsMock));

    serviceInstance.getTeams().subscribe(teams => {
      expect(teams).toEqual(TeamsMock);
    });
  });
});
