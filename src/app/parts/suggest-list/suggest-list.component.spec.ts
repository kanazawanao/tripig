import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { provideMockStore } from '@ngrx/store/testing';
import { SuggestListComponent } from './suggest-list.component';

describe('SuggestListComponent', () => {
  let component: SuggestListComponent;
  let fixture: ComponentFixture<SuggestListComponent>;

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

    fixture = TestBed.createComponent(SuggestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
