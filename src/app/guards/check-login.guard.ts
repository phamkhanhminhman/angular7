import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Injectable()
export class CheckLoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router, ) { }
    canActivate() {
        let status = this.loginService.IsLogged();
        // if (status == false) {
        //     alert('You dont have permission access');
        // }
        if (status || localStorage.getItem('token') !== null) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
