import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Email } from './email';

@Injectable()
export class EmailService {

  private emailUrl = environment.emailUrl;
  private listservUrl = environment.listservUrl;

  constructor(private http: HttpClient) { }

  sendEmail(emailObj: Email): Observable<any> {
    return this.http
      .post(this.emailUrl, emailObj)
      .map((response:Response) => response)
      .catch((err: any) => Observable.of(false));
  }

  addUserToListserv(user: Email): Observable<any> {
    return this.http
      .post(this.listservUrl, user)
      .map((response:Response) => response)
      .catch((err: any) => Observable.of(false));
  }

}
