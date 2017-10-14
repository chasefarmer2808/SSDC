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

  constructor(private emailService: EmailService, private fb: FormBuilder) {
    this.emailObj = new Email();
    this.createEmailForm();
  }

  ngOnInit() {
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.pattern(emailPattern)]],
      body: [this.emailObj.body, Validators.maxLength(this.bodyInputLength)],
      listServ: true
    })
  }

  updateEmailObj(emailFormInfo:any) {
    this.emailObj.emailAddress = emailFormInfo.email;
    this.emailObj.body = emailFormInfo.body;
    this.emailObj.enableListServ = emailFormInfo.listServ;
  }

  submitEmail() {
    this.updateEmailObj(this.emailForm.value)
    if (this.emailForm.valid) {
      this.emailService.sendEmail(this.emailObj);
    } else {
      console.log('Form invalid');
    }
  }

}
