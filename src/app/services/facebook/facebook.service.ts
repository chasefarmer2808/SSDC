import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Event } from '../../events/event';
import { Album } from '../../gallery/album';

@Injectable()
export class FacebookService {

  private fbUrl = environment.facebookUrl;

  constructor(private http: Http) { }

  getEvents(): Promise<Event[]> {
    return this.http.get(`${this.fbUrl}/getEvents`)
               .toPromise()
               .then(response => response.json().data as Event[])
               .catch(this.handleError);
  }

  getAlbums(): Promise<Album[]> {
    return this.http.get(`${this.fbUrl}/albums`)
               .toPromise()
               .then(response => response.json().data as Album[])
               .catch(this.handleError);
  }

  private generateEventLink(eventId: string): String {
    return `https://facebook.com/events/${eventId}`;
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }

}
