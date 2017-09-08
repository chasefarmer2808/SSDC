import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
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

  constructor() {}

  ngOnInit() {
    this.navDropDown = false;
    this.myRoutes = routes;
  }

  toggleNav() {
    this.navDropDown = !this.navDropDown;
  }

}
