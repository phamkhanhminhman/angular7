import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  public error = null;
  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService,
              private httpService: HttpService,
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.form);
    return this.http.post('http://127.0.0.1:8000/api/login', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    if (data.message === 'Login thành công') {
      localStorage.setItem('token', data.data[0].api_token);
     // this.loginService.SetLogin(true);
      this.loginService.loggedIn.next(true);
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
