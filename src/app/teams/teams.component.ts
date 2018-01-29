import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from '../services/teams/teams.service';
import { Team } from '../services/teams/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css', '../app.component.css'],
  providers: [ TeamsService ]
})
export class TeamsComponent implements OnInit {

  name: string;
  overview: string;
  goal: string;
  onTitlePage: boolean;
  teams: Array<Team> = [];
  selectedTeam: Team;
  teamDescription: string = 
    `
    Design teams are a great way to get involved in SSDC!  Members get real hands
    on experience by participating in competition.  Are available teams are listed
    below.  Anyone is welcome to join, regardless of skill level.  If any of the teams
    interest you, express your interest at our next meeting, facebook page, or direct
    email!
    `;

  constructor(private route: ActivatedRoute, private router: Router, private teamsService: TeamsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!this.isEmpty(params)) {
        this.selectedTeam = params as Team;
        this.onTitlePage = false;
      } else {
        this.selectedTeam = undefined;
        this.onTitlePage = true;
      }
    });

    this.getTeams();
  }

  getTeams() {
    this.teamsService.getTeams()
      .subscribe(teams => {
        this.teams = teams;
      });
  }

  selectTeam(team: Team) {
    this.router.navigate(['/teams', team]);
  }

  backToTeamsMenu() {
    this.router.navigate(['/teams']);
  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

}
