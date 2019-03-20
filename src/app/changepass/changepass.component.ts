import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  public form = {
    old_pass: null,
    new_pass: null,
    confirm: null,
  };
  public error;
  constructor(private http: HttpClient, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.form.new_pass !== this.form.confirm) {
      alert('Mật khẩu xác nhận ko trùng mk mới');
    } else {
      this.httpService.updatePass(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
    console.log(this.form);
  }
  handleResponse(data) {
    console.log(data);
    if (data.message === 'Mật khẩu cũ không chính xác') {
      alert(data.message);
    } else {
      alert(data.message);
      this.router.navigateByUrl('/home');
    }
    // this.results = data['data'];
    // console.log(this.results);
  }
  handleError(error) {
    this.error = error.error.error;
  }

}
