import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  id;
  token;
  results;
  url = 'http://127.0.0.1:8000/api/users/';
  public error = null;
  public form = {
    old_pass: null,
    new_pass: null,
    confirm: null,
  };
  // public results: any[];
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }
  addUser(data) {
    console.log(data);
    this.http.post(this.url, data).subscribe(res => console.log('Register done'));
  }
  updateUser(data) {
    console.log(data);
    this.http.put(this.url, data).subscribe(res => console.log('Update done'));
  }
  loginUser(data) {
    console.log(data);
    this.http.post(this.url, data).subscribe(
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
  updatePass(form) {
    this.token = localStorage.getItem('token');
    return this.http.put(this.url, form, { headers: { token: this.token } });
  }
  deleteUser(id) {
    this.token = localStorage.getItem('token');
    return this.http.delete(this.url + id, { headers: { token: this.token } });
  }
  getUser(id) {
    this.token = localStorage.getItem('token');
    console.log('service  ' + this.token);
    return this.http.get(this.url + id, { headers: { token: this.token } });
  }
  getUsers() {
    this.token = localStorage.getItem('token');
    return this.http.get(this.url, { headers: { token: this.token } });
  }

}
