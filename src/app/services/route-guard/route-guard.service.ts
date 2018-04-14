import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { ROLES } from '../user/roles';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    let hasAuthority = this.auth.hasRole(ROLES.DEV) || this.auth.hasRole(ROLES.ADMIN);
    if (this.auth.isLoggedIn() && hasAuthority) {
      return true;
    }

    this.auth.logout();
    this.router.navigate(['login']);
    return false;
  }
}
