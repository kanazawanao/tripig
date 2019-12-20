import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { PlaceService } from './place.service';
import { environment } from 'src/environments/environment';

describe('PlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
    ],
    providers: [
      GooglePlus,
    ]
  }));

  it('should be created', () => {
    const service: PlaceService = TestBed.inject(PlaceService);
    expect(service).toBeTruthy();
  });
});
