import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { provideMockStore } from '@ngrx/store/testing';
import { IonicModule } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { RegisteredRoutesComponent } from './registered-routes.component';
import { environment } from 'src/environments/environment';

describe('RegisteredRoutesComponent', () => {
  let component: RegisteredRoutesComponent;
  let fixture: ComponentFixture<RegisteredRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisteredRoutesComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ],
      providers: [
        provideMockStore(),
        GooglePlus,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
