import { MapRouteSearchContainerComponent } from './map-route-search-container.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

describe('ContainerComponent', () => {
  let component: MapRouteSearchContainerComponent;
  let fixture: ComponentFixture<MapRouteSearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapRouteSearchContainerComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapRouteSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
