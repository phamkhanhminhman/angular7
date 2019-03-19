import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public apiToken: string = localStorage.getItem('token');
  apiURL = 'http://127.0.0.1:8000/api/users';
  constructor(private http: HttpClient,
              private httpService: HttpService,
              private router: Router,
              private loginService: LoginService
  ) { }
  ngOnInit() {
    console.log(this.apiToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: this.apiToken
      })
    };
    this.http.get('http://127.0.0.1:8000/api/users', { headers: { token: this.apiToken } }).subscribe((data) => {
      return this.results = data['data'];
    });
    console.log(this.results);
  }
  listUser(user) {
    this.router.navigateByUrl('/edit');
  }
}
