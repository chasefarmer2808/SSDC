import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './user';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  private createUserUrl: string = `${environment.userUrl}/create`;
  private existUrl: string = `${environment.userUrl}/exist`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(environment.userUrl)
      .catch((err: any) => Observable.throw(err));
  }

  createUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.createUserUrl, user)
      .catch((err: any) => Observable.throw(err));
  }

  checkUserExist(username: string = ''): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.existUrl}/${username}`)
      .catch((err: any) => Observable.throw(err));
  }

}
