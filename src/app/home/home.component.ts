import { Component, OnInit } from '@angular/core';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {

  clubName:string;
  clubMessage:string;
  aboutUs:string;

  constructor() { }

  ngOnInit() {
    this.clubName = 'Space Systems Design Club';
    this.clubMessage = 'Orbiting student designs';
    this.aboutUs = `This is our overarching goal. To this end, the University of Florida’s Space
                    Systems Design Club consists of both design teams and general body meetings
                    in order to educate our club members and give them practical experience
                    relating to space system technology. At our general body meetings, we bring
                    members working in the space industry to speak on applications of space
                    systems and how their work relates to our goals. We also organize research
                    symposiums with UF faculty to introduce our members about ongoing research
                    in the field. Our design teams aim to research and generate innovative
                    designs in satellite technology, while educating club members about space
                    systems design, documentation, and more. We do all this in order to
                    accomplish our purpose – to inspire the next generation of engineers and
                    scientists to work in the space industry, and to develop new technologies in
                    the world of space systems.`
  }

}
