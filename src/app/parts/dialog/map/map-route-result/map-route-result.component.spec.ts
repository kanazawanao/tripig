import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRouteResultComponent } from './map-route-result.component';

describe('MapRouteResultComponent', () => {
  let component: MapRouteResultComponent;
  let fixture: ComponentFixture<MapRouteResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRouteResultComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRouteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
