import {inject} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from "./auth.service";

export const AuthInterceptor = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const modifiedRequest = req.clone({
        withCredentials: true
    });

    return next(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log('----')
            console.log(error);
            console.log('----')

            if (error.status === 401 || error.status === 403) {
                authService.logout()
                router.navigate(['/auth/logout']);
            }

            return throwError(() => error);
        })
    );
};
