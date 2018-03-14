import { Component, OnInit, AfterContentInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import { User } from '../services/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {

  loginForm: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;
  loginFail: boolean = false;

  @ViewChild('usernameInput') usernameInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService, 
              private renderer: Renderer2,
              private router: Router) {
    this.createLoginForm();
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.usernameInput.nativeElement.focus();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value)
    .subscribe(
      (res) => {
        this.loading = false;
        this.loginFail = false;
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.loading = false;
        this.loginFail = true;
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type', 'text');
    } else {
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type', 'password');
    }
  }

}
