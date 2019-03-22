import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  id;
  results;
  public error = null;
  public form = {
    email: null,
    name: null,
    gender: 0,
    description: null,
  };
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private httpService: HttpService,
              private router: Router) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id nhan dc: ' + this.id);
    this.httpService.get(config.userUrl + this.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    console.log(this.results);
  }
  onSubmit() {
    console.log(this.form);
    return this.httpService.update(config.userUrl + this.id, this.form).subscribe(
      data => this.updateResponse(data),
    );
  }
  handleResponse(data) {
    console.log(data);
    this.results = data['data'];
    console.log(this.results);
  }
  updateResponse(data) {
    if (data.message === 'Cập nhật thành công') {
      alert(data.message);
      this.router.navigateByUrl('/list');
    } else {
      alert(data.message);
    }
  }
  handleError(error) {
    this.error = error.message;
  }
}