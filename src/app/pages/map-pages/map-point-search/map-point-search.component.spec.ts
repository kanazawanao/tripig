import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideMockStore } from '@ngrx/store/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { MapPointSearchComponent } from './map-point-search.component';

describe('MapPointSearchComponent', () => {
  let component: MapPointSearchComponent;
  let fixture: ComponentFixture<MapPointSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapPointSearchComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        GoogleMapsModule
      ],
      providers: [
        provideMockStore(),
        Geolocation,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPointSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
