import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

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
  constructor(private http: HttpClient, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.form);
    return this.httpService.addUser(this.form);
  }
  onFileChange(event) {
  }
  handleResponse(data) {
    this.router.navigateByUrl('/login')
  }
  handleError(error) {
    this.error = error.error.error;
  }
}
