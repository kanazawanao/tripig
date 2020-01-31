import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

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
export class InviteGroupComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(
    private dialogRef: MatDialogRef<InviteGroupComponent>
  ) { }

  ngOnInit() {}
  onNoClick() {
    console.log(this.emailFormControl.value);
    this.dialogRef.close();
  }
}
