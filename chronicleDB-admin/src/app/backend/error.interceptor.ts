import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService, private snackBar: MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.accountService.isLoggedIn()) {
                // auto logout if 401 or 403 response returned from api
                let snackBarRef =this.snackBar.open("Error: Verification failed! Please relogin.", "", {
                    duration: 6000,
                    panelClass: ['red-snackbar'],
                    });
                this.accountService.logout();
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(err);
        }))
    }
}