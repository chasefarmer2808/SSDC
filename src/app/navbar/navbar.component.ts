import { Component, OnInit, NgZone } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { routes } from '../app-routing/app-routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css'],
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

  constructor(zone: NgZone) {
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
  }

  toggleNav() {
    this.navDropDown = !this.navDropDown;
  }

  closeNav(collapse: boolean) {
    this.navDropDown = false;

    if (collapse) {
      this.collapseAll();
    }
  }

  toggleScrollable(route: any) {
    route.data.showScrollables = !route.data.showScrollables;
  }

  collapseAll() {
    for (let route of this.myRoutes) {
      route.data.showScrollables = false;
    }
  }

}
