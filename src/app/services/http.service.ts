import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  uri = 'http://127.0.0.1:8000/api/users';
  public error = null;
  public results: any[];
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }
  addUser(data) {
    console.log(data);
    this.http.post(this.uri, data).subscribe(res => console.log('Done'));
  }
  loginUser(data) {
    console.log(data);
    this.http.post(this.uri, data).subscribe(
  // tslint:disable-next-line: no-shadowed-variable
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    if (data.message === 'Login thành công') {
     // this.loginService.SetLogin(true);
     localStorage.setItem('token', data.data.api_token);
     this.router.navigateByUrl('/home');
     console.log(data);
    } else {
      console.log(data);
    }
  }
  handleError(error) {
    this.error = error.error.error;
  }

}
