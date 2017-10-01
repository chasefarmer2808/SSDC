import { Component, OnInit } from '@angular/core';

import { EmailService } from '../services/email/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
