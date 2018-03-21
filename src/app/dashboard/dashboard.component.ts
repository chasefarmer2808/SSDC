import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClickOutsideDirective } from '../directives/click-outside/click-outside.directive';

import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css']
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
