import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  id;
  results;
  public error = null;
  apiToken = localStorage.getItem('token');
  url = 'http://127.0.0.1:8000/api/users/';
  public form = {
    email: null,
    name: null,
    gender: 1,
    description: null,
  };
  constructor(private route: ActivatedRoute, private http: HttpClient, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id nhan dc: ' + this.id);
    // return this.http.get(this.url + this.id, {headers: {token: this.apiToken}}).subscribe(
    //   data => this.handleResponse(data),
    //   error => this.handleError(error)
    // );
    this.httpService.getUser(this.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    console.log(this.results);
  }
  handleResponse(data) {
    console.log(data);
    this.results = data['data'];
    console.log(this.results);
  }
  handleError(error) {
    this.error = error.error.error;
  }
  onSubmit() {
    console.log(this.form);
    alert('Updated');
    this.router.navigateByUrl('/list');
    return this.http.put(this.url + this.id, this.form).subscribe(
      data => this.handleResponse(data),
    );
  }
}
