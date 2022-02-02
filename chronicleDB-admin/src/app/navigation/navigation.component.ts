import { Component, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isOpen = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  @HostBinding('class') className = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private overlay: OverlayContainer,
    public jobService: JobService
  ) {}
  toggleControl = new FormControl(false);

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName =  'darkMode';
      this.className = darkMode? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  onAccountIconClicked() {
    if (!this.authService.isLoggedIn()) {
      let url = this.router.routerState.snapshot.url;
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      if (url == "/" || url == "/login") {
        this.router.navigate(['/login']);
      } else if (returnUrl) {
        this.router.navigate(['/login'], {queryParams:  {returnUrl: returnUrl}});
      } else {
        this.router.navigate(['/login'], {queryParams:  {returnUrl: url}});
      }
    } else {
      this.isOpen = !this.isOpen;
    }
  }
}
