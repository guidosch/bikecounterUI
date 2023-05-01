import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export default class LoginButtonComponent {
  //injected DOM Document object.
  constructor(@Inject(DOCUMENT) public document: Document,public auth: AuthService) {}

  login() {
    this.auth.loginWithRedirect();
  }
}
