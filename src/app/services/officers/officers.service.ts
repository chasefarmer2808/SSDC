import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import { Officer } from './officer';

@Injectable()
export class OfficersService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Officer[]> {
    return this.http 
      .get<Officer[]>(environment.officersUrl)
      .catch(this.handleObservableError);
  }

  getPresident() {
    // for (let officer of Officers) {
    //   if (officer.role == 'President') {
    //     return officer;
    //   }
    // }
  }

  private handleObservableError(error: Response) {
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
  }

}
