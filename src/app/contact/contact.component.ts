import { Component, OnInit } from '@angular/core';

import { EmailService } from '../services/email/email.service';
import { Email } from '../services/email/email';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submitEmail() {
    console.log('Sending email...');
  }

}
