import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;
  loggedUser: string;

  constructor(private authService: AuthService) {
    this.authService.isLogged()
      .subscribe(result => {
        if (result && result.uid) {
          this.loggedIn = true;
          this.loggedUser = this.authService.getUser().currentUser.email;
        } else {
          this.loggedIn = false;
        }
      }, () => {
        this.loggedIn = false;
      });
  }

  logout() {
    this.authService.logout();
  }
}
