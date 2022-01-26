import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../model/LoginCredentials';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/User';


export const BACKEND_URL : string = "http://127.0.0.1:5002/";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginCredentials): Observable<boolean> {
    return this.http
      .post<{token : string}>(BACKEND_URL + 'user_login', JSON.stringify(credentials), {observe: 'response'})
      .pipe(
        map((httpResponse) => {
          // console.log(httpResponse.body)
          if (httpResponse.status == 200 && httpResponse.body) {
            localStorage.setItem('token', httpResponse.body.token);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return !jwtHelper.isTokenExpired(token);
  }

  get currentUser() : User | null{
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);
  }

  get username() : string | null {
    return this.currentUser?.username || null;
  }

  isUserAdmin() : boolean {
    return this.currentUser?.isAdmin || false;
  }

  canUserCreateStreams() : boolean {
    return this.currentUser?.canCreateStreams || false;
  }

  canUserAccessStream(id : number) {
    return this.currentUser?.allStreamsAllowed || this.currentUser?.allowedStreams?.includes(id) || false;
  }

  canUserInsertToStream(id : number) {
    return this.currentUser?.canInsertAll || this.currentUser?.allowedInsertStreams?.includes(id) || false;
  }
  getUsers():any{
    console.log("calling backend")
    let myResponse = this.http.get("http://127.0.0.1:5002/getUsers")
  }
}
