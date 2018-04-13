import { Pipe, PipeTransform } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';

import { ROLES } from 'app/services/user/roles';

@Pipe({
  name: 'routeGuardFilter',
  pure: false
})
export class RouteGuardFilterPipe implements PipeTransform {

  constructor(private authService: AuthService) {}

  transform(routes: Routes): Routes {
    let visibleRoutes = routes.filter(route => {
      let isLoggedIn = this.authService.isLoggedIn();
      let canActivate = this.authService.hasRole(ROLES.DEV) || 
                        this.authService.hasRole(ROLES.ADMIN) 
                        
      if (route.canActivate) {
        if (isLoggedIn && canActivate) {
          return route.data;
        }
      } else {
        return route.data;
      }
    });

    return visibleRoutes;

  }

}
