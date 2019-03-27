import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = null;
  name = null;
  password = null;
  test = null;
  gender = null;
  description = null;
  image = null;
  imgURL;
  public error = null;
  registerForm: FormGroup;
  submitted = false;
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('name', this.name);
      formData.append('password', this.password);
      formData.append('gender', this.gender);
      formData.append('image', this.image);
      return this.http.post(config.userUrl, formData).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
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
    console.log('aaa');
  }
  preview(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    console.log(files[0]);
    // preview image
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
    this.image = files[0];
    // console.log(this.form.image);
  }
}
