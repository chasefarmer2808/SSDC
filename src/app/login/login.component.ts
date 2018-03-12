import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth/auth.service';

import { User } from '../services/auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  showPassword: boolean = false;

  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService, 
              private renderer: Renderer2) {
    this.user = new User();
    this.createLoginForm();
  }

  ngOnInit() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]]
    });
  }

  login() {
    this.authService.login(this.user).subscribe((res) => {
      console.log(res);
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
