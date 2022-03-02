import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCredentials } from '../model/LoginCredentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent {
  invalidLogin: boolean = false; 

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService) { }

  signIn(credentials: LoginCredentials) {
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result) {
          this.invalidLogin = false; 
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          // Navigiere entweder zu returnUrl oder zu der Homepage falls es null ist
          this.router.navigate([returnUrl || '/']);
        }
        else  
          this.invalidLogin = true; 
      });
  }
}
