import { Component, OnInit } from '@angular/core';

import { OfficersService } from 'app/services/officers/officers.service';
import { OfficerDataSource } from 'app/services/officers/officer-data-source';

import { Officer } from 'app/services/officers/officer';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-officers-dashboard',
  templateUrl: './officers-dashboard.component.html',
  styleUrls: [
    './officers-dashboard.component.css',
    '../dashboard.component.css',
    '../../app.component.css'
  ]
})
export class OfficersDashboardComponent implements OnInit {

  columnsToDisplay: Array<string> = ['photo'];
  officersDataSource: OfficerDataSource;
  serverUrl: string = environment.serverUrl;
  dataSaving: boolean = false;
  deleting: boolean = false;

  constructor(private officersService: OfficersService) { }

  ngOnInit() {
    this.officersDataSource = new OfficerDataSource(this.officersService);
    this.officersDataSource.loadOfficers();
  }

}
