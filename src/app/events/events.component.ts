import { Component, OnInit } from '@angular/core';

import { FacebookService } from '../services/facebook/facebook.service';
import { Event } from './event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [FacebookService]
})
export class EventsComponent implements OnInit {

  events: Event[];

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.facebookService.getEvents()
        .then(events => this.events = events);
  }

}
