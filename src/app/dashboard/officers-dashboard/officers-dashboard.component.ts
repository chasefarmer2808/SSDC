import { Component, OnInit } from '@angular/core';

import { OfficersService } from 'app/services/officers/officers.service';
import { OfficerDataSource } from 'app/services/officers/officer-data-source';

import { Officer } from 'app/services/officers/officer';

@Component({
  selector: 'app-officers-dashboard',
  templateUrl: './officers-dashboard.component.html',
  styleUrls: ['./officers-dashboard.component.css']
})
export class OfficersDashboardComponent implements OnInit {

  officersDataSource: OfficerDataSource;

  constructor(private officersService: OfficersService) { }

  ngOnInit() {
    // this.officersService.getOfficers()
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //     },
    //     (err) => {
    //       console.log('Error: ', err);
    //     }
    //   );
    this.officersDataSource = new OfficerDataSource(this.officersService);
    this.officersDataSource.loadOfficers();
  }

}
