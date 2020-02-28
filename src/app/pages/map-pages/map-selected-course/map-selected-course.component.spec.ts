import { MapSelectedCourseComponent } from './map-selected-course.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';


describe('MapSelectedCourseComponent', () => {
  let component: MapSelectedCourseComponent;
  let fixture: ComponentFixture<MapSelectedCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [MapSelectedCourseComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule, GoogleMapsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapSelectedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
