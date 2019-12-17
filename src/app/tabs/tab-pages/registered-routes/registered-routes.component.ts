import { Component } from '@angular/core';
import { PlaceService } from 'src/app/services/place.service';
import { Course } from 'src/app/models/course.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registered-routes',
  templateUrl: './registered-routes.component.html',
  styleUrls: ['./registered-routes.component.scss'],
})
export class RegisteredRoutesComponent {
  courses$?: Observable<Course[]>;
  constructor(private placeService: PlaceService) { }

  ionViewDidEnter() {
    this.courses$ = this.placeService.getAllPlace();
  }

}
