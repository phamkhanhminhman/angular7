import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$;
  constructor(private router: Router, private loginService: LoginService, ) { }
  public currentUser = null;
  ngOnInit() {
      this.isLoggedIn$ = this.loginService.isLoggedIn;
  }
  logout() {
    console.log('logout');
    localStorage.removeItem('token');
  }


}
