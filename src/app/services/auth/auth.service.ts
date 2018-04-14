import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) { }

  private setSession(authRes: AuthRes) {
    const expiresAt = moment().add(authRes.expiresIn, 'second');
    localStorage.setItem('id_token', authRes.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', authRes.username);
    localStorage.setItem('role', authRes.role);

    let expireTimeInMilliSec: number = parseInt(authRes.expiresIn) * 1000;

    setTimeout(() => {
      this.logout();
      this.router.navigate(['login']);
    }, expireTimeInMilliSec);
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
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    return moment(JSON.parse(expiration));
  }

  hasRole(role: string): boolean {
    let sessionRole = localStorage.getItem('role');
    return sessionRole === role;
  }

  getSessionUsername(): string {
    if (this.isLoggedIn()) {
      return localStorage.getItem('username');
    }
    return undefined;
  }

  getSessionItemIfLoggedIn(itemKey): string {
    if (this.isLoggedIn()) {
      return localStorage.getItem(itemKey);
    }
    return undefined;
  }

  getSessionUser(): any {
    if (this.isLoggedIn()) {
      let username = this.getSessionItemIfLoggedIn('username');
      let role = this.getSessionItemIfLoggedIn('role');
      return {username: username, role: role};
    }
  }
}
