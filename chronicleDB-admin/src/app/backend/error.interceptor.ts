import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // if ([401, 403].includes(err.status) && this.accountService.isLoggedIn()) {
            //     // auto logout if 401 or 403 response returned from api
            //     this.accountService.logout();
            //     console.log("Logout erzwungen, da Fehler!");
            // }

            // const error = err.error?.message || err.statusText;
            // console.error(err);
            return throwError(err);
        }))
    }
}