import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Email } from './email';

@Injectable()
export class EmailService {

  private emailUrl = environment.emailUrl;
  private listservUrl = environment.listservUrl;

  constructor(private http: Http) { }

  sendEmail(emailObj: Email): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.emailUrl, emailObj)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });

    return promise;
  }

  addUserToListserv(user: Email): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.listservUrl, user)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });

    return promise;
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

}
