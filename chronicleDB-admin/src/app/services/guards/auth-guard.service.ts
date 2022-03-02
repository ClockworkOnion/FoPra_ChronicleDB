import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return Promise.resolve(true);
    }
    
    if (state.url == "/") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login'], {queryParams:  {returnUrl: state.url}});
    }
    
    return Promise.reject(false);
  }
}
