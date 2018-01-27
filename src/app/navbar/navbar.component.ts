import { Component, OnInit, NgZone } from '@angular/core';
import { Routes, Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { routes } from '../app-routing/app-routes';
import { ClickOutsideDirective } from '../directives/click-outside/click-outside.directive';
import { TeamsService } from '../services/teams/teams.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css'],
  providers: [ TeamsService ],
  animations: [
    trigger('dropDown', [
      state('0', style({
        display: 'none',
        opacity: '0',
        transform: 'translateX(-100%)'
      })),
      state('1', style({
        display: 'block',
        opacity: '1',
        transform: 'translateX(0%)'
      })),
      transition('* => *', animate('500ms ease-in-out'))
    ]),
    trigger('rotate180', [
      state('0', style({
        transform: 'none'
      })),
      state('1', style({
        transform: 'rotate(-179deg)'
      })),
      transition('* => *', animate('300ms ease-in-out'))
    ]),
    trigger('slideDown', [
      state('0', style({
        overflow: 'hidden',
        height: '0px'
      })),
      state('1', style({
        overflow: 'hidden',
        height: '*'
      })),
      transition('* => *', animate('300ms ease-in-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {

  navDropDown:boolean;
  scrolledUp: boolean;
  myRoutes:Routes;
  fbLink:string;
  emailAddr:string;
  currentRoute:string;

  constructor(zone: NgZone, private router: Router, private teamsService: TeamsService) {
    window.onscroll = () => {
      zone.run(() => {
        if (window.pageYOffset > 0) {
          this.scrolledUp = false;
        } else {
          this.scrolledUp = true;
        }
      });
    };
  }

  ngOnInit() {
    this.navDropDown = false;
    this.scrolledUp = true;
    this.myRoutes = routes;
    this.fbLink = 'https://www.facebook.com/groups/ufssdc/';
    this.emailAddr = 'ufssdc@gmail.com';

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.currentRoute = evt.url;
      }
    });

    this.populateTeamsSubItems();
  }

  navigate(routePath: string, params:any) {
    this.router.navigate([routePath, params])
  }

  populateTeamsSubItems() {
    let teamsRoute = this.getRoute('teams');

    if (!teamsRoute) {
      return;
    }

    this.teamsService.getTeams()
      .subscribe(teams => {
        teamsRoute.data.subItems = teams;
      });
  }

  getRoute(routePath: string): any {
    for (let route of this.myRoutes) {
      if (route.path == routePath) {
        return route;
      }
    }
  }

  toggleNav() {
    this.navDropDown = !this.navDropDown;
  }

  closeNav(collapse: boolean, routePath: string) {
    this.navDropDown = false;

    if (collapse) {
      this.collapseAll();
    }

    this.scrollTopOnSameRoute(routePath);
  }

  toggleSubItemVisible(route: any) {
    route.data.showSubItems = !route.data.showSubItems;
  }

  collapseAll() {
    for (let route of this.myRoutes) {
      route.data.showSubItems = false;
    }
  }

  navClassHandler() {
    let result:String = '';

    if (this.scrolledUp && !this.navDropDown) {
      result = 'navbar-transparent';
    }

    if (!this.scrolledUp) {
      result = 'navbar-small';
    }

    return result;
  }

  scrollTopOnSameRoute(routePath: string) {
    routePath = `/${routePath}`;
    
    if (routePath == this.currentRoute) {
      window.scrollTo(0,0);
    }
  }

}
