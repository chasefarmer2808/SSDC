import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { OfficersService } from './officers.service';
import { Officer } from './officer';
import { OfficersMock } from './officers.mock';

import { environment } from '../../../environments/environment';

describe('OfficersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficersService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([OfficersService], (service: OfficersService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all officers', inject([OfficersService], (service: OfficersService) => {
    let getOfficersSpy = spyOn(service, 'getOfficers')
                        .and.returnValue(Observable.of(OfficersMock));

    service.getOfficers().subscribe(officers => {
      expect(officers).toEqual(OfficersMock);
    });
  }));

  it('should create GET request for getOfficers', async(inject([OfficersService, HttpTestingController],
    (service: OfficersService, backend: HttpTestingController) => {

      service.getOfficers().subscribe();

      backend.expectOne({
        url: `${environment.officersUrl}`,
        method: 'GET'
      });

    })));

  it('should create GET request for getPresident', async(inject([OfficersService, HttpTestingController],
    (service: OfficersService, backend: HttpTestingController) => {

      service.getPresident().subscribe();

      backend.expectOne({
        url: `${environment.officersUrl}president`,
        method: 'GET'
      });

    })));


});
