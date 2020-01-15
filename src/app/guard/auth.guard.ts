import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(): Observable<boolean> {
    return this.auth // 変更
      .checkLoginState()
      .pipe(
        map(session => {
          // ログインしていない場合はログイン画面に遷移
          if (!session.login) {
            this.router.navigate(['/tabs/pages/signIn']);
          }
          return session.login;
        })
      );
  }
}
