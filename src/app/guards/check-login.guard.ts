
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CheckLoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router, ) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.loginService.isLoggedIn.pipe(
          take(1),
          map((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          })
        );
      }
}
