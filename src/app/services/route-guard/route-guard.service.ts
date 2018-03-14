import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
