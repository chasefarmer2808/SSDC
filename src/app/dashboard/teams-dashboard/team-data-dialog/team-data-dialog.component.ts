import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { TeamsService } from 'app/services/teams/teams.service';

import { Team } from 'app/services/teams/team';

const alphanumericOnlyRegex = /^[a-zA-Z0-9\s]+$/;

@Component({
  selector: 'app-team-data-dialog',
  templateUrl: './team-data-dialog.component.html',
  styleUrls: [
    './team-data-dialog.component.css',
    '../teams-dashboard.component.css',
    '../../dashboard.component.css',
    '../../../app.component.css'
  ]
})
export class TeamDataDialogComponent implements OnInit {
  teamForm: FormGroup;
  savingTeam: boolean = false;
  saveSuccess: boolean = false;
  addMode: boolean = false;
  saveError: any;

  constructor(public dialogRef: MatDialogRef<TeamDataDialogComponent>,
              private teamsService: TeamsService,
              @Inject(MAT_DIALOG_DATA) public teamData: Team) {
    this.createTeamForm();
  }

  ngOnInit() {
  }

  createTeamForm() {
    this.teamForm = new FormGroup({
      name: new FormControl(this.teamData.name, [Validators.required, Validators.pattern(alphanumericOnlyRegex)]),
      overview: new FormControl(this.teamData.overview, [Validators.required, Validators.pattern(alphanumericOnlyRegex)]),
      goal: new FormControl(this.teamData.goal, [Validators.required, Validators.pattern(alphanumericOnlyRegex)]),
    });
  }

}
