import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';


import { User } from '../user/user';
import { AuthRes } from './authres';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  private loginUrl: string = `${environment.authUrl}/login`

  constructor(private http: HttpClient) { }

  private setSession(authRes: AuthRes) {
    const expiresAt = moment().add(authRes.expiresIn, 'second');
    localStorage.setItem('id_token', authRes.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  login(user: User): Observable<any> {
    return this.http
      .post<AuthRes>(this.loginUrl, user)
      .do(res => this.setSession(res))
      .shareReplay() // prevent multiple post requests
      .catch((err: any) => Observable.throw(err));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    return moment(JSON.parse(expiration));
  }
}
