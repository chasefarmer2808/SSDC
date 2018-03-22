import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

import { User } from './user';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  private createUserUrl: string = `${environment.userUrl}/create`;
  private existUrl: string = `${environment.userUrl}/exist`;
  private updateRoleUrl: string = `${environment.userUrl}/role`;
  private updatePasswordUrl: string = `${environment.userUrl}/password`;

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

  updateRole(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.updateRoleUrl}`, user)
      .catch((err: any) => Observable.throw(err));
  }

  updateRoleMany(users: Set<User>): Observable<any> {
    let requests: Array<Observable<User>> = [];

    users.forEach(user => {
      requests.push(this.updateRole(user));
    })

    return Observable.forkJoin(requests)
  }

  updatePassword(oldPass: string, newPass: string): Observable<any> {
    let body = {
      oldPassword: oldPass,
      newPassword: newPass
    };

    return this.http
      .put<any>(this.updatePasswordUrl, body)
      .catch((err: any) => Observable.throw(err));
  }

}
