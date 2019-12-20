import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { IonicModule } from '@ionic/angular';

import { PointSearchComponent } from './point-search.component';

describe('PointSearchComponent', () => {
  let component: PointSearchComponent;
  let fixture: ComponentFixture<PointSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PointSearchComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
