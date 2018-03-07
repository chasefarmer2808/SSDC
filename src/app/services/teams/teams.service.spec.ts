import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import 'rxjs/Rx';

import { TeamsService } from './teams.service';
import { Team } from './team';
import { TeamsMock } from './teams.mock';

import { environment } from '../../../environments/environment';

describe('TeamsService', () => {

  let serviceInstance:TeamsService;
  let getTeamsSpy:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsService],
      imports: [ HttpClientTestingModule ]
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

  it('should create GET request for getTeams', async(inject([TeamsService, HttpTestingController],
    (service: TeamsService, backend: HttpTestingController) => {

      service.getTeams().subscribe();

      backend.expectOne({
        url: `${environment.teamsUrl}`,
        method: 'GET'
      });

    })));
});
