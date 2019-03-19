import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public userLogin: boolean;
  isLoggedIn$: Observable<boolean>;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggeIn;
  }

}
