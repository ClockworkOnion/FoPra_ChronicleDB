import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../model/LoginCredentials';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials: LoginCredentials) : Observable<boolean> {    
   return this.http.post<string>('/users/authenticate', JSON.stringify(credentials))
      .pipe(map(response => {
        if (response) {
          localStorage.setItem("token", response);
          return true;
        } else {
          return false;
        }
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return !jwtHelper.isTokenExpired(token);
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);
  }
}
