import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { provideMockStore } from '@ngrx/store/testing';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { MapRouteResultComponent } from './map-route-result.component';
import { environment } from 'src/environments/environment';

describe('MapRouteResultComponent', () => {
  let component: MapRouteResultComponent;
  let fixture: ComponentFixture<MapRouteResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapRouteResultComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ],
      providers: [
        provideMockStore(),
        Geolocation,
        GooglePlus,
        InAppBrowser,
      ]
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
