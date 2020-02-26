import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  private readonly TITLE = 'title';
  get title(): string {
    return this.editProjectForm.controls[this.TITLE].value;
  }
  private readonly DESTINATION = 'destination';
  get destination(): string {
    return this.editProjectForm.controls[this.DESTINATION].value;
  }
  private readonly DETAIL = 'detail';
  get detail(): string {
    return this.editProjectForm.controls[this.DETAIL].value;
  }
  private readonly MEMBERS = 'members';
  get members(): string {
    return this.editProjectForm.controls[this.MEMBERS].value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  save() {
    console.log(this.title);
    console.log(this.destination);
    console.log(this.detail);
    console.log(this.members);
  }
}
