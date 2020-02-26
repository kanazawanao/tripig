import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-invite-group',
  templateUrl: './invite-group.component.html',
  styleUrls: ['./invite-group.component.scss'],
})
export class InviteGroupComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  constructor(private userService: UserService, private dialogRef: MatDialogRef<InviteGroupComponent>) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  addUserByEmail() {
    // HACK:メールアドレス検索が有効だと危険なので対策を考える。uid検索がいい？
    this.userService.getUserByEmail(this.emailFormControl.value).subscribe((u) => {
      if (u) {
        this.dialogRef.close(u.uid);
      } else {
        alert('見つかりませんでした。');
        this.dialogRef.close();
      }
    });
  }
}
