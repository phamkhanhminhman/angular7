import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  results;
  data;
  constructor(private http: HttpClient) {
  }
  handleHeader() {
    return {
      headers: new HttpHeaders({
        token: localStorage.getItem('token'),
      })
    };
  }
  get(url) {
    return this.http.get(url, this.handleHeader());
    // .pipe(catchError(this.handleError));
  }
  add(url, data) {
    return this.http.post(url, data, this.handleHeader());
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
