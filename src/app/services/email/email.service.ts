import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

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

  constructor(private http: Http) { }

  sendEmail(emailObj: Email): Observable<any> {
    return this.http
      .post(this.emailUrl, emailObj)
      .map((response:Response) => response)
      .catch(this.handleObservableError);
  }

  addUserToListserv(user: Email): Observable<any> {
    return this.http
      .post(this.listservUrl, user)
      .map((response:Response) => response)
      .catch(this.handleObservableError);
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

  private handleObservableError(error: Response) {
    console.error(error);
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
  }

}
