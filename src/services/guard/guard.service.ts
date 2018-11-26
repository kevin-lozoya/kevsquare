import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  loggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.isLogged()
      .subscribe(result => {
        if (result && result.uid) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }, () => {
        this.loggedIn = false;
      });
  }

  canActivate() {
    return this.loggedIn;
  }

}
