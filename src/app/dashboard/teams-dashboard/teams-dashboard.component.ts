import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { TeamsService } from 'app/services/teams/teams.service';
import { TeamDataSource } from 'app/services/teams/team-data-source';

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

  columnsToDisplay: Array<string> = ['name', 'overview', 'goal'];
  teamDataSource: TeamDataSource;
  selectedRows: SelectionModel<Team>;
  deleteSuccess: boolean = false;
  deleteError: any;

  constructor(private teamsService: TeamsService, private teamDialog: MatDialog) { 
    this.selectedRows = new SelectionModel<Team>(true, []);
  }

  ngOnInit() {
    this.teamDataSource = new TeamDataSource(this.teamsService);
    this.teamDataSource.loadTeams();
  }

  openTeamDialog() {
    this.teamDialog.open(TeamDataDialogComponent, {data: new Team()});
  }

}
