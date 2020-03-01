import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TripigActions from 'src/app/store/tripig.action';
import * as TripigReducer from 'src/app/store/tripig.reducer';
import { Category } from 'src/app/parts/category.class';
import { Direction } from 'src/app/models/interface/direction.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  editProjectForm = this.fb.group({
    title: ['', Validators.required],
    destination: ['', Validators.required],
    detail: ['', Validators.required],
    members: ['', Validators.required],
  });
  category: Category = { icon: '', index: 0, value: '', viewValue: '', custome: false };
  get direction(): Direction {
    const direction: Direction = {
      destination: this.destination,
      origin: '',
      radius: 10000,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    return direction;
  }
  private readonly TITLE = 'title';
  get title(): string {
    return this.editProjectForm.controls[this.TITLE].value;
  }
  set title(value: string) {
    this.editProjectForm.controls[this.TITLE].setValue(value);
  }
  private readonly DESTINATION = 'destination';
  get destination(): string {
    return this.editProjectForm.controls[this.DESTINATION].value;
  }
  set destination(value: string) {
    this.editProjectForm.controls[this.DESTINATION].setValue(value);
  }
  private readonly DETAIL = 'detail';
  get detail(): string {
    return this.editProjectForm.controls[this.DETAIL].value;
  }
  set detail(value: string) {
    this.editProjectForm.controls[this.DETAIL].setValue(value);
  }
  private readonly MEMBERS = 'members';
  get members(): string {
    return this.editProjectForm.controls[this.MEMBERS].value;
  }
  set members(value: string) {
    this.editProjectForm.controls[this.MEMBERS].setValue(value);
  }
  constructor(private fb: FormBuilder, private store: Store<TripigReducer.State>) {}

  ngOnInit() {}

  save() {}

  search(): void {
    this.store.dispatch(TripigActions.setDirection({ direction: this.direction }));
    this.store.dispatch(TripigActions.setCategory({ category: this.category }));
  }
}
