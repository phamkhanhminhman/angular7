import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services';
import { HttpClient} from '@angular/common/http';
import { config } from 'src/app/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  results;
  id;
  public error = null;
  constructor(private httpService: HttpService, private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.httpService.get(config.userUrl).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    console.log(data);
    this.results = data['data'];
  }
  handleError(error) {
    this.error = error.message;
    this.router.navigateByUrl('/zzz');
  }
  deleteUser(id) {
     if (confirm('Are you sure delete id =  ' + id)) {
      return this.httpService.delete(config.userUrl + id).subscribe(
        data => this.handleDelete(data),
      );
     }
  }
  handleDelete(data) {
    console.log(data);
    this.httpService.get(config.userUrl).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
}
