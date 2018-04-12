import { Pipe, PipeTransform } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';

@Pipe({
  name: 'routeGuardFilter',
  pure: false
})
export class RouteGuardFilterPipe implements PipeTransform {

  constructor(private authService: AuthService) {}

  transform(routes: Routes): Routes {
    let visibleRoutes = routes.filter(route => {
      if (route.canActivate) {
        if (this.authService.isLoggedIn()) {
          return route.data;
        }
      } else {
        return route.data;
      }
    });

    return visibleRoutes;

  }

}
