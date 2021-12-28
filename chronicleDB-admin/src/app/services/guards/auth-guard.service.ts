import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      console.log("eingeloggt");
      
      return true;
    }
        
    console.log("nicht eingeloggt");
    
    this.router.navigate(['/login'], {queryParams:  {returnUrl: state.url}});
    console.log("navigation");
    
    return false;
  }
}
