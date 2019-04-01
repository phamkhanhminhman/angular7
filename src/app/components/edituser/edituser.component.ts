import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config/config';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  id;
  results;
  groups;
  public error = null;
  public form = {
    email: null,
    name: null,
    gender: null,
    groupID: null,
    description: null,
    image: File
  };
  imgURL;
  imgURL2;
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
    this.httpService.get(config.url + 'group').subscribe(
      data => this.handleGroup(data)
    );
    console.log(this.results);
  }
  onSubmit() {
    console.log('name nhan dc ' + this.form.name);
    return this.httpService.update(config.userUrl + this.id, this.form).subscribe(
      data => this.updateResponse(data),
    );
  }
  handleGroup(data) {
    this.groups = data['data'];
    console.log(this.groups);
  }
  handleResponse(data) {
    console.log(data);
    this.results = data['data'];
    this.form.name = this.results[0].name;
    this.form.description = this.results[0].description;
    this.form.email = this.results[0].image;
    this.form.gender = this.results[0].gender;
    this.form.groupID = this.results[0].groupID;
    this.imgURL = this.results[0].image;
    console.log(this.results);
  }
  updateResponse(data) {
    if (data.message === 'Cập nhật thành công') {
      alert(data.message);
      this.router.navigateByUrl('/list');
    } else {
      console.log(data.message);
    }
  }
  handleError(error) {
    this.error = error.message;
  }
  preview(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    console.log(files[0]);
    // preview image
    reader.onload = (event) => {
      this.imgURL2 = reader.result;
    };
    this.form.image = files[0];
    // console.log(this.form.image);
  }
}
