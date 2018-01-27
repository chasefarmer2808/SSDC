import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';

import { Team } from './team';

@Injectable()
export class TeamsService {

  constructor(private http: Http) { }

  getTeams(): Observable<Team[]> {
    return this.http 
      .get(`${environment.assetsUrl}/data/teams.json`)
      .map((response:Response) => <Team[]> response.json().data)
      .catch(this.handleObservableError);
  }

  private handleObservableError(error: Response) {
    console.error(error);
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
  }

}
