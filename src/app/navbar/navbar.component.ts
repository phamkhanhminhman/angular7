import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, ) { }
  public currentUser = null;
  ngOnInit() {
      this.currentUser =  this.loginService.getToken();
  }
  logout() {
    console.log('logout');
    localStorage.removeItem('token');
  }


}
