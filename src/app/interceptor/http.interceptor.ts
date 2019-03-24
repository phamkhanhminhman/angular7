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
                  // client-side error
                    console.log(error.status);
                    switch (error.status) {
                      case this.BadRequest :
                        console.log(error.message);
                        break;
                      case this.Unauthorized :
                        console.log(error.message);
                        break;
                      case this.InternalServerError :
                        console.log(error.message);
                        break;
                      case 0 :
                        console.log('0000000');
                        break;                    }
                    return throwError(error.message);
                } else {
                  // server-side error
                    alert(error);
                    return throwError(error);
                }
            })
        )
    }

}