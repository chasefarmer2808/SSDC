import { Component, OnInit } from '@angular/core';

import { OfficersService } from '../services/officers/officers.service';
import { Officer } from '../services/officers/officer';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css', '../app.component.css'],
  providers: [OfficersService]
})
export class OfficersComponent implements OnInit {

  officers: Officer[];

  constructor(private officersService: OfficersService) { }

  ngOnInit() {
    this.officers = this.officersService.getOfficers();
  }

}
