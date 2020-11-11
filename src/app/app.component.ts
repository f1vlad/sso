import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sso-app';

  constructor(
    private oauthService: OAuthService
  ) {
    this.configureSingleSignOn();
  }

  configureSingleSignOn() {
    this.oauthService.configure(authConfig); // from sso.config.ts
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow();

    // max:geheim
  }

  logout() {
    this.oauthService.logOut();
  }

  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
