import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css']
})
export class DashboardComponent implements OnInit {

  dashboards: Array<any>;
  showDashButtons: boolean;

  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router,
              private location: PlatformLocation) { }

  ngOnInit() {
    this.showDashButtons = true;
    this.dashboards = this.activatedRoute.routeConfig.children;

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (this.onMainMenu()) {
          this.showDashButtons = true;
        } else {
          this.showDashButtons = false;
        }
      }
    });
  }

  private onMainMenu(): boolean {
    return this.location.pathname === '/dashboard';
  }
}
