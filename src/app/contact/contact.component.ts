import { Component, OnInit } from '@angular/core';

import { EmailService } from '../services/email/email.service';
import { Email } from '../services/email/email';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
  providers: [EmailService]
})
export class ContactComponent implements OnInit {

  emailObj: Email;

  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.emailObj = new Email();
  }

  submitEmail() {
    console.log('Sending email...');
    this.emailService.sendEmail(this.emailObj);
  }

}
