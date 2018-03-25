import { ROLES } from './roles';
import { SetItem } from 'app/utility/generic-set';

export class User implements SetItem {
    username: string;
    password: string;
    role: string;

    constructor(username?: string, password?: string, role?: string) {
        this.username = username || '';
        this.password = password || '';
        this.role = role || ROLES.USER;
    }

    equals(other: User): boolean {
        return other == this;
    }
};

