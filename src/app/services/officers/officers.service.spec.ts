import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OfficersService } from './officers.service';

import { OfficersMock } from './officers.mock';

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

  it('should get all officers');

  it('should get the president officer');

  it('should create GET request for getTeams');

  it('should create GET request for getPresident');


});
