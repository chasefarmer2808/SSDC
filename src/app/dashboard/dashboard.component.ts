import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboards: Array<any>;

  constructor(private userService: UserService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.dashboards = this.router.routeConfig.children;
  }
}
