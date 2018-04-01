import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import { Officer } from './officer';

@Injectable()
export class OfficersService {

  constructor(private http: HttpClient) { }

  getOfficers(): Observable<Officer[]> {
    return this.http 
      .get<Officer[]>(environment.officersUrl)
      .catch(this.handleObservableError);
  }

  getPresident(): Observable<Officer> {
    return this.http
      .get<Officer>(`${environment.officersUrl}president`)
      .catch(this.handleObservableError);
  }

  createOfficer(newOfficer: FormData): Observable<Officer> {
    return this.http
      .post<Officer>(`${environment.officersUrl}create`, newOfficer)
      .catch(this.handleObservableError);
  }

  deleteOfficer(firstName: string, lastName: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.officersUrl}${firstName}/${lastName}`)
      .catch(this.handleObservableError);
  }

  deleteOfficerMany(officers: Officer[]): Observable<any> {
    let requests: Array<Observable<any>> = [];

    officers.forEach(officer => {
      requests.push(this.deleteOfficer(officer.firstName, officer.lastName));
    });

    return Observable.forkJoin(requests);
  }

  private handleObservableError(error: Response) {
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
  }

}
