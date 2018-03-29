import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'; 
import 'rxjs/add/operator/filter'

import { OfficersService } from './officers.service';
import { Officer } from './officer';

export class OfficerDataSource implements DataSource<Officer> {
    private officersSubject = new BehaviorSubject<Officer[]>([]);
    private laodingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.laodingSubject.asObservable();

    constructor(private officersService: OfficersService) {}

    connect(CollectionViewer: CollectionViewer): Observable<Officer[]> {
        return this.officersSubject.asObservable();
    }

    disconnect(CollectionViewer: CollectionViewer): void {
        this.officersSubject.complete();
        this.laodingSubject.complete();
    }

    loadOfficers() {
        this.laodingSubject.next(true);
        this.officersService.getOfficers()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.laodingSubject.next(false))
            )
            .subscribe(officers => {
                console.log(officers)
                this.officersSubject.next(officers);
            });
    }

    getOfficers(): Officer[] {
        return this.officersSubject.getValue();
    }
}