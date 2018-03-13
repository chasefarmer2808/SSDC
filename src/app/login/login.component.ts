import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

import { User } from '../services/auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword: boolean = false;

  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService, 
              private renderer: Renderer2,
              private router: Router) {
    this.createLoginForm();
  }

  ngOnInit() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
    .subscribe(
      (res) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        // handle errors here
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
