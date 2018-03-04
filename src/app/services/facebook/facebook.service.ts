import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
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

  getEvents(): Observable<Event[]> {
    return this.http
      .get(`${this.fbUrl}/getEvents`)
      .map((response: Response) => <Event[]> response.json().data)
      .catch(this.handleObservableError);   
  }

  getAlbums(): Observable<Album[]> {
    return this.http
      .get(`${this.fbUrl}/albums`)
      .map((response: Response) => <Album[]> response.json().data)
      .catch(this.handleObservableError);
  }

  getAlbum(id:String): Observable<Photo[]> {
    return this.http
      .get(`${this.fbUrl}/album/${id}`)
      .map((response:Response) => <Photo[]> response.json().data)
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
