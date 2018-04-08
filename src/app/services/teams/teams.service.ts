import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';

import { Team } from './team';

@Injectable()
export class TeamsService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http 
      .get<Team[]>(environment.teamsUrl)
      .catch(this.handleObservableError);
  }

  createTeam(newTeam: Team): Observable<Team> {
    return this.http
      .post<Team>(`${environment.teamsUrl}create`, newTeam)
      .catch(this.handleObservableError);
  }

  updateTeam(updatedTeam: Team): Observable<Team> {
    return this.http
      .put<Team>(`${environment.teamsUrl}${updatedTeam._id}`, updatedTeam)
      .catch(this.handleObservableError);
  }

  deleteTeam(id: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.teamsUrl}${id}`)
      .catch(this.handleObservableError);
  }

  deleteTeamMany(teams: Team[]): Observable<any> {
    let requests: Array<Observable<any>> = [];

    teams.forEach(team => {
      requests.push(this.deleteTeam(team._id));
    });

    return Observable.forkJoin(requests);
  }

  private handleObservableError(error: HttpErrorResponse) {
    return Observable.throw(error.message);
  }

}
