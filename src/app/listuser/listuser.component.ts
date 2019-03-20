import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  results;
  id: number;
  public error = null;
  public apiToken: string = localStorage.getItem('token');
  apiURL = 'http://127.0.0.1:8000/api/users/';
  constructor(private http: HttpClient,
              private httpService: HttpService,
              private router: Router,
              private loginService: LoginService
  ) { }
  ngOnInit() {
    console.log('TOKEN: ' + this.apiToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.apiToken
      })
    };
    // this.http.get(this.apiURL, { headers: {token: this.apiToken}}).subscribe(data => this.handleResponse(data));
    this.httpService.getUsers().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    console.log(data);
    this.results = data['data'];
  }
  handleError(error) {
    this.error = error.error.error;
  }
  deleteUser(id) {
    if (confirm('Are you sure to delete ' + id)) {
    }
   // this.http.delete(this.apiURL + id, {headers: {token: this.apiToken}}).subscribe(data => this.handleResponse(data));
  }
}
