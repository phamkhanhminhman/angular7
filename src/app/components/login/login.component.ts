import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null,
    captcha: null
  };
  public error = null;
  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService,
  ) { }
  ngOnInit() {
  }
  onSubmit() {
    console.log(this.form);
    return this.http.post(config.url + 'login', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  resolved(captchaResponse: string) {
    this.form.captcha = captchaResponse;
    console.log(this.form.captcha);
  }
  handleResponse(data) {
    if (data.message === 'Login thành công') {
      alert(data.message);
      localStorage.setItem('token', data.data[0].api_token);
      sessionStorage.setItem('token', data.data[0].api_token);
      this.loginService.loggedIn.next(true);
      this.router.navigateByUrl('/home');
      console.log(data);
    } else {
      alert('Captcha Required');
    }
  }
  handleError(error) {
      alert('failed123')
  }
}
