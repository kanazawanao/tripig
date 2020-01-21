import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}
  canActivate(): Observable<boolean> {
      return this.auth
      .checkLoginState()
      .pipe(
        map(session => {
          // ログインしている場合はルート画面表示
          if (session.login) {
            this.router.navigate(['/']);
          }
          return !session.login;
        })
      );
  }
}
