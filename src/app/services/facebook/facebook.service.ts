import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Event } from '../../events/event';

@Injectable()
export class FacebookService {

  private fbUrl = '/api/v1/fb/getEvents';

  constructor(private http: Http) { }

  getEvents(): Promise<Event[]> {
    return this.http.get(this.fbUrl)
               .toPromise()
               .then(response => response.json().data as Event[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

}
