import { Component, OnInit } from '@angular/core';

import { EmailService } from '../services/email/email.service';
import { Email } from '../services/email/email';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
})
export class ContactComponent implements OnInit {

  userEmail: string;
  emailBody: string;

  constructor() { }

  ngOnInit() {
    this.userEmail = "";
    this.emailBody = "Hello!\r\n\r\nMy name is _____ and I would like to express my interest in the Space Systems Design Club!"
  }

  submitEmail() {
    console.log('Sending email...');
  }

}
