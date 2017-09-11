import { Component, OnInit } from '@angular/core';

import { OfficersService } from '../services/officers/officers.service';
import { Officer } from '../services/officers/officer';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
  providers: [OfficersService]
})
export class ContactComponent implements OnInit {

  officers: Officer[];

  constructor(private officersService: OfficersService) { }

  ngOnInit() {
    this.officers = this.officersService.getOfficers();
  }

}
