import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';
  public rememberMe: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  authenticate(form: NgForm) {
    if (form.valid) {
      // TODO: perform authentication
      this.router.navigateByUrl('/');
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
