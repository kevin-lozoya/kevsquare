import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registro: any = {};

  constructor(private authService: AuthService) { }

  registrar() {
    this.authService.registro(this.registro.email, this.registro.password);
  }
}
