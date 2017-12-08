import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { EventsComponent } from '../events/events.component';
import { ContactComponent } from '../contact/contact.component';
import { GalleryComponent } from 'app/gallery/gallery.component';

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
          selector: '#about-heading'
        },
        {
          name: 'Officers',
          selector: '#officers-heading'
        },
        {
          name: 'Events',
          selector: '#events-header'
        }
      ]
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {name: 'Contact'}
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: {
      name: 'Gallery'
    }
  }
];
