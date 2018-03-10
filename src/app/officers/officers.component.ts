import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { OfficersService } from '../services/officers/officers.service';
import { Officer } from '../services/officers/officer';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css', '../app.component.css'],
  providers: [OfficersService],
  animations: [
    trigger('slideDown', [
      state('0', style({
        height: '0px',
        overflow: 'hidden'
      })),
      state('1', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('* => *', animate('100ms ease-in-out'))
    ]),
    trigger('plusToCross', [
      state('0', style({
        transform: 'none',
        color: '#37b8eb'
      })),
      state('1', style({
        transform: 'rotate(45deg)',
        color: '#d9534f'
      })),
      transition('* => *', animate('100ms ease-in-out'))
    ])
  ]
})
export class OfficersComponent implements OnInit {

  officers: Officer[] = [];

  constructor(private officersService: OfficersService) { }

  ngOnInit() {
    this.getOfficers();
  }

  getOfficers() {
    this.officersService.getOfficers()
      .subscribe(officers => {
        this.officers = officers;
      });
  }

  toggleOfficerInfo(officer: Officer) {
    officer.showInfo = !officer.showInfo;
  }
}
