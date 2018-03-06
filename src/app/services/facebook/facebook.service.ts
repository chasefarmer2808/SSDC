import { Injectable } from '@angular/core';
// import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Event } from '../../events/event';
import { Album } from '../../gallery/album';
import { Photo } from '../../gallery/photo';

@Injectable()
export class FacebookService {

  private fbUrl = environment.facebookUrl;

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http
      .get<Event[]>(`${this.fbUrl}/getEvents`)
      .catch(this.handleObservableError);   
  }

  getAlbums() {
    return this.http
      .get<Album[]>(`${this.fbUrl}/albums`)
      .catch(this.handleObservableError);
  }

  getAlbum(id:String) {
    return this.http
      .get<Photo[]>(`${this.fbUrl}/album/${id}`)
      .catch(this.handleObservableError);
  }

  private generateEventLink(eventId: string): String {
    return `https://facebook.com/events/${eventId}`;
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
