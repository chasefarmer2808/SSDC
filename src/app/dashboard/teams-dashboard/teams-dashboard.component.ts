import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { TeamsService } from 'app/services/teams/teams.service';
import { TeamDataSource } from 'app/services/teams/team-data-source';

import { StatusMessageComponent } from 'app/status-message/status-message.component';

import { Team } from 'app/services/teams/team';

const alphanumericOnlyRegex = /^[a-zA-Z0-9\s]+$/;

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

  columnsToDisplay: Array<string> = ['name'];
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

}
