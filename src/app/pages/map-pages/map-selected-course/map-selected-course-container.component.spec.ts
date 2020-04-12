import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapSelectedCourseContainerComponent } from './map-selected-course-container.component';

describe('MapSelectedCourseContainerComponent', () => {
  let component: MapSelectedCourseContainerComponent;
  let fixture: ComponentFixture<MapSelectedCourseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectedCourseContainerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapSelectedCourseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
