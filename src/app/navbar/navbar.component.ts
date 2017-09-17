import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { routes } from '../app-routing/app-routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
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
    ])
  ]
})
export class NavbarComponent implements OnInit {

  navDropDown:boolean;
  myRoutes:Routes;
  fbLink:string;
  emailAddr:string;

  constructor() {}

  ngOnInit() {
    this.navDropDown = false;
    this.myRoutes = routes;
    this.fbLink = 'https://www.facebook.com/groups/ufssdc/';
    this.emailAddr = 'ufssdc@gmail.com';
  }

  toggleNav() {
    this.navDropDown = !this.navDropDown;
  }

  closeNav() {
    this.navDropDown = false;
  }

  toggleScrollable(route: any) {
    route.data.showScrollables = !route.data.showScrollables;
  }

}
