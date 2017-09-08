import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { EventsComponent } from '../events/events.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {name: 'Home'}
  },
  {
    path: 'events',
    component: EventsComponent,
    data: {name: 'Events'}
  }
];
