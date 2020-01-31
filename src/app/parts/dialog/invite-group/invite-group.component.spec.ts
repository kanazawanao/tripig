import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InviteGroupComponent } from './invite-group.component';

describe('InviteGroupComponent', () => {
  let component: InviteGroupComponent;
  let fixture: ComponentFixture<InviteGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteGroupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
