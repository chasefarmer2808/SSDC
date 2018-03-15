import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { UserService } from 'app/services/user/user.service';

import { User } from '../services/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;
  loginFail: boolean = false;
  signUp: boolean = false;

  @ViewChild('usernameInput') usernameInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private userService: UserService, 
              private renderer: Renderer2,
              private router: Router) {
    this.createLoginForm();
    this.createSignUpForm();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstPassword: ['', [Validators.required]],
      secondPassword: ['', [Validators.required]],
    })
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

  createUser() {
    // TODO: make sure password matches and username does not already exist.
    let user = new User(this.signUpForm.value.username, this.signUpForm.value.firstPassword);
    this.userService.createUser(user)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['home']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type', 'text');
    } else {
      this.renderer.setAttribute(this.passwordInput.nativeElement, 'type', 'password');
    }
  }

  toggleSignUpForm() {
    this.signUp = !this.signUp;
  }

}
