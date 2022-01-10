import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize } from 'rxjs/operators';
import { UserAuthenticator } from './user-authenticator';
import { UserManager } from './user-manager';

// array in local storage for registered users
const usersKey = 'angular-10-registration-login-example-users';

let token = localStorage.getItem('usersKey');
let users = token ? JSON.parse(token) : null;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\w+$/) && method === 'GET':
                    return getUserByUsername();
                // case url.match(/\/users\/\d+$/) && method === 'PUT':
                //     return updateUser();
                // case url.match(/\/users\/\d+$/) && method === 'DELETE':
                //     return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {            
            let token = UserManager.authenticate(JSON.parse(body));
            if (token) {
                return ok(token);
            } else {
                return loginFailed();
            }
            
            
            // const { username, password } = body;
            // const user = users.find(x => x.username === username && x.password === password);
            // if (!user) return error('Username or password is incorrect');
            // return ok({
            //     ...basicDetails(user),
            //     token: 'fake-jwt-token'
            // })
        }

        function register() {
        //     const user = body

        //     if (users.find(x => x.username === user.username)) {
        //         return error('Username "' + user.username + '" is already taken')
        //     }

        //     user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        //     users.push(user);
        //     localStorage.setItem(usersKey, JSON.stringify(users));
            // return ok();
            UserManager.register(JSON.parse(body))
            return ok();
        }

        function getUsers() {
        //     if (!isLoggedIn()) return unauthorized();
        //     return ok(users.map(x => basicDetails(x)));
            return ok(JSON.stringify(UserManager.getUsers()));
        }

        function getUserByUsername() {
        //     if (!isLoggedIn()) return unauthorized();

        //     const user = users.find(x => x.id === idFromUrl());
        //     return ok(basicDetails(user));
            let user = UserManager.getUserByName(nameFromUrl());
            if (user) {
                return ok(JSON.stringify(user));
            } else {
                return userNotFound();
            }
        }

        // function updateUser() {
        //     if (!isLoggedIn()) return unauthorized();

        //     let params = body;
        //     let user = users.find(x => x.id === idFromUrl());

        //     // only update password if entered
        //     if (!params.password) {
        //         delete params.password;
        //     }

        //     // update and save user
        //     Object.assign(user, params);
        //     localStorage.setItem(usersKey, JSON.stringify(users));

        //     return ok();
        // }

        function deleteUser() {
        //     if (!isLoggedIn()) return unauthorized();

        //     users = users.filter(x => x.id !== idFromUrl());
        //     localStorage.setItem(usersKey, JSON.stringify(users));
        //     return ok();
            if (UserManager.deleteUser(nameFromUrl())) {
                return ok();
            } else {
                return deleteUserFailed();
            }
        }

        // // helper functions

        function ok(body?: string) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        // function error(message: string) {
        //     return throwError({ error: { message } })
        //         .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        // }

        function loginFailed() {
            return throwError({ status: 401, error: { message: 'Login failed!' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function userNotFound() {
            return throwError({ status: 404, error: { message: 'User Not found!' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function deleteUserFailed() {
            return throwError({ status: 403, error: { message: 'Not Allowed!' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        // function basicDetails(user) {
        //     const { id, username, firstName, lastName } = user;
        //     return { id, username, firstName, lastName };
        // }

        // function isLoggedIn() {
        //     return headers.get('Authorization') === 'Bearer fake-jwt-token';
        // }

        function nameFromUrl() {
            const urlParts = url.split('/');
            return urlParts[urlParts.length - 1];
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};