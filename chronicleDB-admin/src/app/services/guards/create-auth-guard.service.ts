import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Wenn Nutzer nicht eingeloggt haben wir hier ein Problem, aber wir testen in app module erst, ob eingeloggt
    // besser aber trotzdem ein Test
    let user = this.authService.currentUser;
    if (user && user.canCreateStreams) return true;
    console.log("kann nciht erstellen");
    
    this.router.navigate(['/no-access']);
    return false;
  }

}
