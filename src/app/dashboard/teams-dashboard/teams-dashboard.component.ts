import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { TeamsService } from 'app/services/teams/teams.service';
import { TeamDataSource } from 'app/services/teams/team-data-source';

import { NavbarComponent } from 'app/navbar/navbar.component';
import { StatusMessageComponent } from 'app/status-message/status-message.component';
import { TeamDataDialogComponent } from 'app/dashboard/teams-dashboard/team-data-dialog/team-data-dialog.component';

import { Team } from 'app/services/teams/team';

@Component({
  selector: 'app-teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  styleUrls: [
    './teams-dashboard.component.css',
    '../dashboard.component.css',
    '../../app.component.css'
  ]
})
export class TeamsDashboardComponent implements OnInit {

  columnsToDisplay: Array<string> = ['name', 'overview', 'goal', 'actions'];
  teamDataSource: TeamDataSource;
  selectedRows: SelectionModel<Team>;
  deleting: boolean = false;
  deleteSuccess: boolean = false;
  deleteError: any;

  constructor(private teamsService: TeamsService, 
              private teamDialog: MatDialog) { 
    this.selectedRows = new SelectionModel<Team>(true, []);
  }

  ngOnInit() {
    this.teamDataSource = new TeamDataSource(this.teamsService);
    this.teamDataSource.loadTeams();
  }

  openTeamDialog() {
    let dialogData = {
      data: {
        team: new Team(),
        dataSource: this.teamDataSource
      }
    };

    this.teamDialog.open(TeamDataDialogComponent, dialogData);
  }

  openUpdateTeamDialog(team: Team) {
    let dialogData = {
      data: {
        team: team,
        dataSource: this.teamDataSource
      }
    };

    this.teamDialog.open(TeamDataDialogComponent, dialogData);
  }

  deleteSelectedTeams() {
    this.deleting = true;
    this.teamsService.deleteTeamMany(this.selectedRows.selected)
      .subscribe(
        (res) => {
          this.teamDataSource.loadTeams();
          this.selectedRows.clear();
          this.deleteSuccess = true;
          this.deleting = false;
        },
        (err) => {
          this.deleteSuccess = false;
          this.deleteError = err;
          this.deleting = false;
          console.log(err);
        }
      )
  }
}
