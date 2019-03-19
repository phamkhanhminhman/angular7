import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
 
  // public isLoggedIn: boolean;
  // public token: string = localStorage.getItem('token');
  // IsLogged(): boolean {
  //     return this.isLoggedIn;
  // }

  // SetLogin(isLoggedIn: boolean) {
  //     this.isLoggedIn = isLoggedIn;
  // }
  getToken(): string {
    return localStorage.getItem('token');
  }


  constructor(private router: Router) { }

}

