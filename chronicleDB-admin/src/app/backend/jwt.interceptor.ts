import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService, BACKEND_URL } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService, private snackBar: SnackBarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn:  boolean = this.accountService.isLoggedIn();
        const token: string | null = localStorage.getItem('token');
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && request.url.includes(BACKEND_URL)) {
            //console.log("Token der HTTP Anfrage hinzugefügt.");
            
            request = request.clone({
                headers: request.headers.append('Authorization', token!)
                // setHeaders: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`
                // }
            });
        }

        if (request.url.includes("localhost:8000") || request.url.includes("localhost:8080")) {
            this.snackBar.openSnackBar("Warning! Directly addressed Chronicle!");
            console.log("Warning! Directly addressed Chronicle!");
        }

        return next.handle(request);
    }
}