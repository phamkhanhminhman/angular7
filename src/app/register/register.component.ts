import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
  public error=null
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.form);
    return this.http.post('http://127.0.0.1:8000/api/users', this.form).subscribe(
      data => this.handleResponse(data),
      error => console.log(error), 
    )
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
