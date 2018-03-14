import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './User';

import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  private createUserUrl: string = `${environment.userUrl}/create`;

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http
      .post<any>(this.createUserUrl, user)
      .catch((err: any) => Observable.throw(err));
  }

}
