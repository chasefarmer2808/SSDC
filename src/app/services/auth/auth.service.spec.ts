import { TestBed, inject } from '@angular/core/testing';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import * as moment from 'moment';
 
import { AuthService } from './auth.service';

import { User } from '../user/user';  

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  afterEach(
    inject([HttpTestingController, AuthService], (backend: HttpTestingController, service: AuthService) => {
      backend.verify();
      service.logout();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should nullify token and expiration in local storage', 
    inject([AuthService], (service: AuthService) => {
      localStorage.setItem('id_token', 'abcd');
      localStorage.setItem('expires_at', '12345');

      service.logout();

      expect(localStorage.getItem('id_token')).toBeNull();
      expect(localStorage.getItem('expires_at')).toBeNull();
  }));

  it('should return true if expiration is in the future', 
    inject([AuthService], (service: AuthService) => {
      let expiresAt = moment().add('20', 'second');
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

      let getExpirationSpy = spyOn(service, 'getExpiration').and.callThrough();

      let isLoggedin = service.isLoggedIn();

      expect(getExpirationSpy).toHaveBeenCalled();
      expect(isLoggedin).toBeTruthy();
  }));

  it('should return true if expiration is in the future', 
    inject([AuthService], (service: AuthService) => {
      let expiresAt = moment().subtract('20', 'second');
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

      let getExpirationSpy = spyOn(service, 'getExpiration').and.callThrough();

      let isLoggedin = service.isLoggedIn();

      expect(getExpirationSpy).toHaveBeenCalled();
      expect(isLoggedin).toBeFalsy();
  }));
  
});
