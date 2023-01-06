import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
    // this.authService.user.subscribe((user) => console.log(user));
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // login
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      // signup
      authObs = this.authService.signup(form.value.email, form.value.password);
    }

    authObs.subscribe({
      next: (resData) => {
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
      },
      complete: () => {
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
