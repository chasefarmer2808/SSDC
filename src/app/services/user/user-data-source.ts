import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'; 
import 'rxjs/add/operator/filter'

import { UserService } from './user.service';
import { User } from './user';

export class UserDataSource implements DataSource<User> {
    private usersSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private sessionUsername;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private userService: UserService, private username) {
        this.sessionUsername = username;
    }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers() {
        this.loadingSubject.next(true);
        this.userService.getAll()
            .pipe(
                map(users => users.filter(user => user.username !== this.username)),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(users => {
                this.usersSubject.next(users)
            });
    }

    getUsers(): User[] {
        return this.usersSubject.getValue();
    }
}