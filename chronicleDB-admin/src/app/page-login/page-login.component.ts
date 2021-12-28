import { Component } from '@angular/core';
import { LoginCredentials } from '../model/LoginCredentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent {

  constructor(private authService: AuthService) { }

  signIn(credentials: LoginCredentials) {
    this.authService.login(credentials).subscribe(response => console.log(response));
    
  }

}
