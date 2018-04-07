import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { EmailService } from '../services/email/email.service';
import { OfficersService } from '../services/officers/officers.service';
import { FacebookService } from '../services/facebook/facebook.service';
import { Email } from '../services/email/email';
import { Event } from '../events/event';

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
  emailLoading: boolean = false;
  emailSuccess: boolean = false;
  emailError: boolean = false;
  listservLoading: boolean = false;
  listservSuccess: boolean = false;
  listservError: boolean = false;
  emailAddr: string = environment.emailAddress;
  presEmailAddr: string;
  office: string = environment.office;
  nextEvent: Event;

  constructor(private emailService: EmailService, 
              private fb: FormBuilder, 
              private officersService: OfficersService,
              private facebookService: FacebookService) {
    this.emailObj = new Email();
    this.createEmailForm();
  }

  ngOnInit() {
    this.getPresidentEmailAddress();
    this.setNextEventLink();
  }

  setNextEventLink() {
    this.facebookService.getEvents()
      .subscribe(
        (events) => {
          if (events.length > 0) {
            this.nextEvent = events[0];
          }
      });
  }

  getPresidentEmailAddress() {
    this.officersService.getPresident()
      .subscribe((president) => {
        this.presEmailAddr = president.emailAddress;
      });
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      email: [this.emailObj.emailAddress, [Validators.required, Validators.pattern(emailPattern)]],
      firstName: [this.emailObj.firstName, [Validators.required, Validators.pattern(lettersOnlyRegex)]],
      lastName: [this.emailObj.lastName, [Validators.required, Validators.pattern(lettersOnlyRegex)]],
      body: [this.emailObj.body, Validators.maxLength(this.bodyInputLength)]
    });
  }

  updateEmailObj(emailFormInfo:any) {
    this.emailObj.emailAddress = emailFormInfo.email;
    this.emailObj.firstName = emailFormInfo.firstName;
    this.emailObj.lastName = emailFormInfo.lastName;
    this.emailObj.body = emailFormInfo.body;
  }

  resetMsgFlags() {
    this.emailSuccess = false;
    this.emailError = false;
    this.emailLoading = true;
  }

  setListservLoadingFlags() {
    this.listservSuccess = false;
    this.listservError = false;
    this.listservLoading = true;
  }

  setListservSuccessFlags() {
    this.listservSuccess = true;
    this.listservError = false;
    this.listservLoading = false;
  }

  setListservErrorFlags() {
    this.listservSuccess = false;
    this.listservError = true;
    this.listservLoading = false;
  }

  addUserToListserv() {
    this.setListservLoadingFlags();

    this.updateEmailObj(this.emailForm.value);
    if (this.emailForm.valid) {
      this.emailService.addUserToListserv(this.emailObj)
        .subscribe(
          (response) => {
            this.listservSuccess = true;
            this.listservLoading = false;
          },
          (error) => {
            this.listservError = true;
            this.listservLoading = false;
          });
    }
  }

  submitEmail() {
    this.resetMsgFlags();

    this.updateEmailObj(this.emailForm.value)
    if (this.emailForm.valid) {
      this.emailService.sendEmail(this.emailObj)
        .subscribe(
          (response) => {
            this.emailLoading = false;
            this.emailSuccess = true;
          },
          (err) => {
            this.emailLoading = false;
            this.emailError = true;
          });
    }
  }

}
