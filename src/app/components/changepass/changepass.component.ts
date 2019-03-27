import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config/config';
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
      this.http.put(config.userUrl, this.form, this.httpService.handleHeader()).subscribe(
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
  }
  handleError(error) {
    this.error = error.error.error;
  }

}
