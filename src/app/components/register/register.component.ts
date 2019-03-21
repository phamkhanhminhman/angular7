import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form = {
    email: null,
    name: null,
    gender: null,
    description: null,
    password: null,
  };
  public error = null;
  url = 'http://127.0.0.1:8000/api/users';
  constructor(private http: HttpClient, private router: Router, private httpService: HttpService) { }
  ngOnInit() {
  }
  onSubmit() {
    console.log(this.form);
    return this.httpService.add(config.userUrl, this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    if (data.message === 'Email đăng ký đã bị trùng') {
      alert(data.message);
    } else {
      alert(data.message);
      this.router.navigateByUrl('/login');
    }
    // this.router.navigateByUrl('/login');
  }
  handleError(error) {
    this.error = error.error.error;
  }
}
