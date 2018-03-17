import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ClickOutsideDirective } from '../directives/click-outside/click-outside.directive';

import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css'],
  animations: [
    trigger('slideIn', [
      state('0', style({
        display: 'grid',
        transform: 'translateX(-50%)'
      })),
      state('1', style({
        display: 'grid',
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
    ])
  ]
})
export class DashboardComponent implements OnInit {

  dashboards: Array<any>;
  controlsSlideIn: boolean;

  constructor(private userService: UserService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.dashboards = this.router.routeConfig.children;
    this.controlsSlideIn = false;
  }

  toggleControls() {
    this.controlsSlideIn = !this.controlsSlideIn;
  }
}
