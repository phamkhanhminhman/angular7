import { Component, OnInit } from '@angular/core';
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
    gender: 0,
    description: null,
    password: null,
    image: File = null,
  };

  imgURL;
  public error = null;
  constructor(private router: Router, private httpService: HttpService) { }
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
      console.log(data.message);
      this.router.navigateByUrl('/login');
    }
  }
  handleError(error) {
    this.error = error.error.error;
  }
  preview(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    console.log(files[0]);
    // preview image
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
    // this.form.image = files[0];
    console.log(files);
  }
}
