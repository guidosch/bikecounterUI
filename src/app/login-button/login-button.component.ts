import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.css'],
    standalone: false
})
export default class LoginButtonComponent {
  public document: Document = inject(DOCUMENT);
  public auth = inject(AuthService);

  login() {
    this.auth.loginWithRedirect();
  }
}
