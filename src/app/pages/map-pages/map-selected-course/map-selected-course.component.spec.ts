import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideMockStore } from '@ngrx/store/testing';

import { MapSelectedCourseComponent } from './map-selected-course.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MapSelectedCourseComponent', () => {
  let component: MapSelectedCourseComponent;
  let fixture: ComponentFixture<MapSelectedCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        MapSelectedCourseComponent
      ],
      imports: [
        IonicModule.forRoot(),
        GoogleMapsModule
      ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapSelectedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
