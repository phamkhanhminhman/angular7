import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(sessionStorage.getItem('token'));
  data;
  get isLoggedIn() {
    return this.loggedIn;
  }

  constructor() { }
}

