import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Place } from 'src/app/models/class/place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})
export class PlaceDetailComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<PlaceDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: Place) {}

  ngOnInit() {}

  onCancelClick() {
    this.dialogRef.close();
  }
}
