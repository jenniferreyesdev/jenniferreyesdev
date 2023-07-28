import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.authService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch(() => {
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.authService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/login']);
    }).catch(() => {
      this.loading = false;
    });
  }

}