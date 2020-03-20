import { MapPointSearchContainerComponent } from './map-point-search-container.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

describe('MapPointSearchContainerComponent', () => {
  let component: MapPointSearchContainerComponent;
  let fixture: ComponentFixture<MapPointSearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapPointSearchContainerComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapPointSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
