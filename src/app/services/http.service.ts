import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  id;
  results;
  data;
  constructor(private http: HttpClient, private router: Router) {
  }
  handleHeader() {
    return {
      headers: new HttpHeaders({
        token: localStorage.getItem('token'),
      })
    };
  }
  get(url): Observable<any>  {
    return this.http.get<any>(url, this.handleHeader())
    // .pipe(catchError(this.handleError));
  }
  add(url, data) {
    return this.http.post(url, data);
  }
  update(url, data) {
    return this.http.put(url, data, this.handleHeader());
  }
  delete(url) {
    return this.http.delete(url, this.handleHeader());
  }
  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

}
