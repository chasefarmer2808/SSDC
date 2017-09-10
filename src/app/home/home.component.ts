import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clubName:string;
  clubMessage:string;

  constructor() { }

  ngOnInit() {
    this.clubName = 'Space Systems Design Group';
    this.clubMessage = 'Orbiting student designes';
  }

}
