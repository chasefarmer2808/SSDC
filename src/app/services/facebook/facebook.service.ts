import { Injectable } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
// import { Headers, Http, Response } from '@angular/http';
>>>>>>> implements HttpClient
=======
>>>>>>> backend returns data attribute
=======
>>>>>>> 1fff5d0acb7f079d5b6fc26556d547a0bb73d914
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Event } from '../../events/event';
import { Album } from '../../gallery/album';
import { Photo } from '../../gallery/photo';

@Injectable()
export class FacebookService {

  private fbUrl = environment.facebookUrl;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      .get<Event[]>(`${this.fbUrl}/getEvents`);
=======
      .get<Event[]>(`${this.fbUrl}/getEvents`)
      .catch(this.handleObservableError);   
>>>>>>> implements HttpClient
=======
      .get<Event[]>(`${this.fbUrl}/getEvents`);
>>>>>>> backend returns data attribute
=======
      .get<Event[]>(`${this.fbUrl}/getEvents`);
>>>>>>> 1fff5d0acb7f079d5b6fc26556d547a0bb73d914
  }

  getAlbums(): Observable<Album[]> {
    return this.http
      .get<Album[]>(`${this.fbUrl}/albums`)
      .catch(this.handleObservableError);
  }

  getAlbum(id:String): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${this.fbUrl}/album/${id}`)
      .catch(this.handleObservableError);
  }

  private generateEventLink(eventId: string): String {
    return `https://facebook.com/events/${eventId}`;
  }

  private handleObservableError(error: Response) {
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
  }

}
