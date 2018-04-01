import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css']
})
export class DashboardComponent implements OnInit {

  dashboards: Array<any>;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.dashboards = this.router.routeConfig.children;
  }
}
