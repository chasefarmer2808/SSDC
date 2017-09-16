import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { EventsComponent } from '../events/events.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      name: 'Home',
      showScrollables: false,
      scrollables: [
        {
          name: 'About',
          selector: '.about-container'
        },
        {
          name: 'Officers',
          selector: '.officers-container'
        }
      ]
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {name: 'Contact'}
  }
];
