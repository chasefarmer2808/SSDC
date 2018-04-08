import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { TeamsService } from 'app/services/teams/teams.service';
import { TeamDataSource } from 'app/services/teams/team-data-source';

import { Team } from 'app/services/teams/team';

const alphanumericOnlyRegex = /^[a-zA-Z0-9.,!?"'_\s]+$/;

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
  teamData: Team;
  teamDataSource: TeamDataSource;
  savingTeam: boolean = false;
  saveSuccess: boolean = false;
  addMode: boolean = false;
  saveError: any;

  constructor(public dialogRef: MatDialogRef<TeamDataDialogComponent>,
              private teamsService: TeamsService,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.teamData = this.dialogData.team;
    this.teamDataSource = this.dialogData.dataSource;
    this.createTeamForm();
    this.determineDialogMode(this.teamData);
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

  createTeam() {
    this.savingTeam = true;
    this.teamsService.createTeam(this.teamForm.value)
      .subscribe(
        (res) => {
          this.saveSuccess = true;
          this.savingTeam = false;
          this.teamDataSource.loadTeams();
          console.log(res);
        },
        (err) => {
          this.saveSuccess = false;
          this.saveError = err;
          console.log(err);
        }
      );
  }

  updateTeam() {
    this.savingTeam = true;
    this.updateTeamData();
    this.teamsService.updateTeam(this.teamData)
      .subscribe(
        (res) => {
          this.saveSuccess = true;
          this.savingTeam = false;
          this.teamDataSource.loadTeams();
          console.log(res);
        },
        (err) => {
          this.saveSuccess = false;
          this.saveError = err;
          console.log(err);
        }
      );
  }

  private determineDialogMode(teamData: Team) {
    if (this.teamData._id == undefined) {
      this.addMode = true;
    }
  }

  private updateTeamData() {
    for (let key of Object.keys(this.teamForm.value)) {
      this.teamData[key] = this.teamForm.get(key).value;
    }
  }

}
