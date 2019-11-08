import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-map-route-result',
  templateUrl: './map-route-result.component.html',
  styleUrls: ['./map-route-result.component.scss'],
})
export class MapRouteResultComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MapRouteResultComponent>) { }

  ngOnInit() {}
  
  close() {
    this.dialogRef.close();
  }

  onClose() {
    this.close();
  }

}
