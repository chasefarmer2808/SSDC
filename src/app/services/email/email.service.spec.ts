import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { EmailService } from './email.service';

describe('EmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));
});
