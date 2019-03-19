import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn: boolean;
  public token: string = localStorage.getItem('token');
  IsLogged(): boolean {
      return this.isLoggedIn;
  }

  SetLogin(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  get isLoggeIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor() { }
}

