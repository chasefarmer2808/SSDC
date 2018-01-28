import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css', '../app.component.css']
})
export class TeamsComponent implements OnInit {

  name: string;
  overview: string;
  goal: string;
  teamDescription: string = 
    `
    Design teams are a great way to get involved in SSDC!  Members get real hands
    on experience by participating in competition.  Are available teams are listed
    below.  Anyone is welcome to join, regardless of skill level.  If any of the teams
    interest you, express your interest at our next meeting, facebook page, or direct
    email!
    `;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.name) {
        this.name = params.name;
      } else {
        this.name = undefined;
      }
    })
  }

}
