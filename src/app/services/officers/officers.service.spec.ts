import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OfficersService } from './officers.service';

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
});
