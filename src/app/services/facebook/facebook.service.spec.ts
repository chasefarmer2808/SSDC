import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { FacebookService } from './facebook.service';

describe('FacebookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [FacebookService]
    });
  });

  it('should be created', inject([FacebookService], (service: FacebookService) => {
    expect(service).toBeTruthy();
  }));
});
