
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { map, take } from 'rxjs/operators';
import { CanActivate, Router} from '@angular/router';

@Injectable()
export class CheckLoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router, ) { }
    canActivate() {
        return this.loginService.isLoggedIn.pipe(
          take(1),
          map((isLoggedIn: string) => {
            if (!isLoggedIn) {
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          })
        );
      }
}
