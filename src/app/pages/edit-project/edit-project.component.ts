import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Direction } from 'src/app/models/interface/direction.model';
import { Category } from 'src/app/parts/category.class';
import { ConditionFacade } from 'src/app/store/condition/facades';

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
  category: Category = new Category();
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
  constructor(private fb: FormBuilder, private facadeService: ConditionFacade) {}

  ngOnInit() {}

  save() {}

  search(): void {
    this.facadeService.setDirection(this.direction);
    this.facadeService.setCategory(this.category);
  }
}
