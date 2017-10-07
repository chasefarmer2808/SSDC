import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Email } from './email';

@Injectable()
export class EmailService {

  private emailUrl = environment.emailUrl;

  constructor(private http: Http) { }

  sendEmail(emailObj: Email): Promise<any> {
    const body = {
      subject: emailObj.subject,
      emailAddress: emailObj.emailAddress,
      body: emailObj.body,
      enableListServ: emailObj.enableListServe
    };

    return this.http.post(this.emailUrl, body)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

}
