import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Data, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { CreateAuthGuard } from './create-auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class MasterGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  private dataIndex : number = 0;
  private data! : Data;

  private route!: ActivatedRouteSnapshot;
  private state!: RouterStateSnapshot

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!route.data || !route.data.guards || !route.data.guards.length) {
      console.log(`Achtung: Keine Bedingung zum Betreten der URL ${route.url} getestet!`);
      return true;
    }

    this.route = route;
    this.state = state;

    this.dataIndex = 0;
    this.data = route.data;

    return this.checkAllGuardsRecursive();
  }

  /**
   * Überprüft rekursiv sequentiell alle in data angegebenen Guards.
   * @returns true falls alle erfüllt sind
   */
  private checkAllGuardsRecursive() : Promise<boolean> {
    return this.executeNextGuard()
    .then(() => { // Wenn der aktuelle 
      this.dataIndex++;
      if (this.dataIndex < this.data.guards.length) {
        return this.checkAllGuardsRecursive()
      } else {
        return Promise.resolve(true);
      }
    })
    .catch(() => {
      return Promise.reject(false);
    });
  }

  private executeNextGuard() : Promise<boolean> {
    let guard;

    switch (this.data.guards[this.dataIndex]) {
      case AuthGuard:
        guard = new AuthGuard(this.authService, this.router);
        break;
      case AdminAuthGuard:
        guard = new AdminAuthGuard(this.router, this.authService);
        break;
      case CreateAuthGuard:
        guard = new CreateAuthGuard(this.router, this.authService);
        break;
      default:
        break;
    }

    if (!guard) {
      console.log("Kein entsprechenden Guard gefunden!");
      return Promise.reject(false);
    }

    return guard.canActivate(this.route, this.state);
  }
}