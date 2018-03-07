import { Component, OnInit } from '@angular/core';

import { FacebookService } from '../services/facebook/facebook.service';
import { Event } from './event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css', '../app.component.css'],
  providers: [FacebookService]
})
export class EventsComponent implements OnInit {

  events:Event[] = [];
  noEventsMessage:string;

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.getEvents();
    this.noEventsMessage = 'There are currently no upcoming events.';
  }

  getEvents(): void {
    this.facebookService.getEvents()
        .subscribe(
          (events) => {
            this.events = events;
          }
        );
  }

}
