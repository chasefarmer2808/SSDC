import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    console.log('here');
    if (this.auth.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
