import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class CheckLoginGuard implements CanActivate {
    constructor (private loginService: LoginService){}
    canActivate() {
        let status = this.loginService.IsLogged();
        if (status==false) {
            alert('You dont have permission access');
        }
        return this.loginService.IsLogged();
    }
}