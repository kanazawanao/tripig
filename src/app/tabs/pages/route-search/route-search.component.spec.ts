import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { IonicModule } from '@ionic/angular';

import { RouteSearchComponent } from './route-search.component';

describe('RouteSearchComponent', () => {
  let component: RouteSearchComponent;
  let fixture: ComponentFixture<RouteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouteSearchComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
