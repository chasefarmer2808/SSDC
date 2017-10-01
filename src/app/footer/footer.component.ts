import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { routes } from '../app-routing/app-routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../app.component.css']
})
export class FooterComponent implements OnInit {

  email:string;
  address:string;
  name:string;
  office:string;
  copywriteYear:number;
  myRoutes:Routes;

  constructor() { }

  ngOnInit() {
    this.email = 'ufssdc@gmail.com';
    this.name = 'SSDC';
    this.copywriteYear = new Date().getFullYear();
    this.office = 'NEB 225';
    this.myRoutes = routes;
  }

}
