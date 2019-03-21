import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  id;
  results;
  constructor(private http: HttpClient) {
  }
  handleHeader() {
    return {
      headers: new HttpHeaders({
        token: localStorage.getItem('token'),
      })
    };
  }
  get(url) {
    this.results = this.http.get(url, this.handleHeader());
    this.http.get(url, this.handleHeader()).subscribe(data => this.handleResponse(data), err => this.handleError(err));
    return this.results;
  }
  test() {
    return this.http.get(config.userUrl, this.handleHeader());
  }
  add(url, data) {
    return this.http.post(url, data);
  }
  update(url, data) {
    return this.http.put(url, data, this.handleHeader());
  }
  delete(url) {
    return this.http.delete(url, this.handleHeader());
  }
  handleResponse(data) {
    console.log(data.message);
  }
  handleError(error) {
    console.log(error.message);
  }

}
