import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { EmailService } from '../services/email/email.service';
import { OfficersService } from '../services/officers/officers.service';
import { FacebookService } from '../services/facebook/facebook.service';
import { Email } from '../services/email/email';
import { Officer } from '../services/officers/officer';
import { Event } from '../events/event';

import { OfficersComponent } from '../officers/officers.component';

import { environment } from '../../environments/environment';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const lettersOnlyRegex = /^[a-zA-Z]+$/;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
  providers: [EmailService, OfficersService, FacebookService]
})
export class ContactComponent implements OnInit {

  emailObj: Email;
  emailForm: FormGroup;
  bodyInputLength: number = 300;
  loading: boolean = false;
  emailSuccess: boolean = false;
  emailError: boolean = false;
  emailAddr: string = environment.emailAddress;
  presEmailAddr: string;
  office: string = environment.office;
  officers: Officer[];
  nextEvent: Event;

  constructor(private emailService: EmailService, 
              private fb: FormBuilder, 
              private officersService: OfficersService,
              private facebookService: FacebookService) {
    this.emailObj = new Email();
    this.createEmailForm();
    this.presEmailAddr = this.officersService.getPresident().email;
    this.officers = this.officersService.getOfficers();
  }

  ngOnInit() {
    this.setNextEventLink();
  }

  setNextEventLink() {
    this.facebookService.getEvents()
      .then((events) => {
        if (events.length > 0) {
          this.nextEvent = events[0];
        }
      });
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      email: [this.emailObj.emailAddress, [Validators.required, Validators.pattern(emailPattern)]],
      firstName: [this.emailObj.firstName, [Validators.required, Validators.pattern(lettersOnlyRegex)]],
      lastName: [this.emailObj.lastName, [Validators.required, Validators.pattern(lettersOnlyRegex)]],
      body: [this.emailObj.body, Validators.maxLength(this.bodyInputLength)],
      listServ: false
    });
  }

  updateEmailObj(emailFormInfo:any) {
    this.emailObj.emailAddress = emailFormInfo.email;
    this.emailObj.firstName = emailFormInfo.firstName;
    this.emailObj.lastName = emailFormInfo.lastName;
    this.emailObj.body = emailFormInfo.body;
    this.emailObj.enableListServ = emailFormInfo.listServ;
  }

  resetMsgFlags() {
    this.emailSuccess = false;
    this.emailError = false;
    this.loading = true;
  }

  submitEmail() {
    this.resetMsgFlags();

    this.updateEmailObj(this.emailForm.value)
    if (this.emailForm.valid) {
      this.emailService.sendEmail(this.emailObj)
        .then((success) => {
          this.loading = false;
          this.emailSuccess = true;
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.emailError = true;
        });
    } else {
      console.log('Form invalid');
    }
  }

}
