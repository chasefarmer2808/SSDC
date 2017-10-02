import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Email } from './email';

@Injectable()
export class EmailService {

  private emailUrl = environment.emailUrl;

  constructor(private http: Http) { }

  sendEmail(emailObj: Email): Promise<any> {
    // const body = {
    //   subject: emailObj.subject,
    //   body: emailObj.body,
    //   email: emailObj.emailAddress,
    //   listServe: emailObj.enableListServe
    // };

    return this.http.post(this.emailUrl, emailObj)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

}
