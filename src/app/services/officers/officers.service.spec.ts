import { TestBed, inject } from '@angular/core/testing';

import { OfficersService } from './officers.service';

describe('OfficersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficersService]
    });
  });

  it('should be created', inject([OfficersService], (service: OfficersService) => {
    expect(service).toBeTruthy();
  }));
});
