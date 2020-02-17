import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Place } from 'src/app/models/interface/place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})
export class PlaceDetailComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PlaceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Place) { }

  ngOnInit() {}

  onCloseClick() {
    this.dialogRef.close();
  }
}
