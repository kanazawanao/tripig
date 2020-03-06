import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/class/session';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public login = false;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.sessionState.subscribe((session: Session) => {
      if (session) {
        this.login = session.login;
      }
    });
  }

  signOut(): void {
    this.auth.signOut();
  }
}
