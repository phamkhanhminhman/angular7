import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedIn: boolean;
  IsLogged(): boolean {
      return this.isLoggedIn;
  }

  SetLogin(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;                                                                                                                                                                                                                             
  }
  constructor() { }
}

