import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { HeaderComponent } from './header.component';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: MockStore<any>;

  beforeEach(async(() => {
    const initialState = {
      selectedList: [],
    };
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ],
      providers: [
        provideMockStore({initialState}),
        GooglePlus,
      ]
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore<any>;
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    mockStore.overrideSelector(TripigSelector.getSelectedList, []);
  });

  afterEach(() => { fixture.destroy(); });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
