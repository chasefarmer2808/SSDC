import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouteGuardService } from './route-guard.service';
import { AuthService } from '../auth/auth.service';

describe('RouteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        RouteGuardService,
        AuthService
      ]
    });
  });

  it('should be created', inject([RouteGuardService], (service: RouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
