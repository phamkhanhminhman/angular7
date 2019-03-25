import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class HttpIntercept implements HttpInterceptor {
    BadRequest = 400;
    Unauthorized = 401;
    Forbidden = 403;
    NotFound = 404;
    TimeOut = 408;
    Conflict = 409;
    InternalServerError = 500;
    constructor(private router: Router) {}
    intercept(request: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    console.log(error.status);
                    switch (error.status) {
                      case this.BadRequest :
                        alert(error.message);
                        this.router.navigateByUrl('/400');
                        break;
                      case this.Unauthorized :
                        alert(error.message);
                        this.router.navigateByUrl('/401');
                        break;
                      case this.InternalServerError :
                        alert(error.message);
                        this.router.navigateByUrl('/500');
                        break;
                      case 0 :
                        alert(error.message);
                        this.router.navigateByUrl('/400');
                        break;                    }
                    return throwError(error.message);
                }
            })
        );
    }
}
