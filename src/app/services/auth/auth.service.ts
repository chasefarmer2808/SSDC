import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  private loginUrl: string = `${environment.authUrl}/login`

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http
      .post(this.loginUrl, user)
      .map((response:Response) => response)
      .catch((err: any) => Observable.of(err));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
