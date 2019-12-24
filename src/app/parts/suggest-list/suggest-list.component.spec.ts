import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as TripigSelector from 'src/app/store/tripig.selector';
import { SuggestListComponent } from './suggest-list.component';
import { Store } from '@ngrx/store';

describe('SuggestListComponent', () => {
  let component: SuggestListComponent;
  let fixture: ComponentFixture<SuggestListComponent>;
  let mockStore: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        SuggestListComponent
      ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [
        provideMockStore(),
        InAppBrowser,
      ]
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore<any>;
    fixture = TestBed.createComponent(SuggestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    mockStore.overrideSelector(TripigSelector.getSuggestList, []);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
