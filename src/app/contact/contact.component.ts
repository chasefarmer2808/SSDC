import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailService } from '../services/email/email.service';
import { Email } from '../services/email/email';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css'],
  providers: [EmailService]
})
export class ContactComponent implements OnInit {

  emailObj: Email;
  emailForm: FormGroup;
  bodyInputLength: number = 300;
  loading: boolean = false;
  emailSuccess: boolean = false;
  emailError: boolean = false;

  constructor(private emailService: EmailService, private fb: FormBuilder) {
    this.emailObj = new Email();
    this.createEmailForm();
  }

  ngOnInit() {
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      body: [this.emailObj.body, Validators.maxLength(this.bodyInputLength)],
      listServ: true
    })
  }

  updateEmailObj(emailFormInfo:any) {
    this.emailObj.emailAddress = emailFormInfo.email;
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
