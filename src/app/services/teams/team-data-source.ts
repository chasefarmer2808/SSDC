import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'; 
import 'rxjs/add/operator/filter'

import { TeamsService } from './teams.service';
import { Team } from './team';

export class TeamDataSource implements DataSource<Team> {
    private teamsSubject = new BehaviorSubject<Team[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    
    public loading$ = this.loadingSubject.asObservable();

    constructor(private teamsService: TeamsService) {}

    connect(CollectionViewer: CollectionViewer): Observable<Team[]> {
        return this.teamsSubject.asObservable();
    }

    disconnect(CollectionViewer: CollectionViewer): void {
        this.teamsSubject.complete();
        this.loadingSubject.complete();
    }

    loadTeams() {
        this.loadingSubject.next(true);
        this.teamsService.getTeams()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(teams => {
                console.log(teams)
                this.teamsSubject.next(teams);
            });
    }
}