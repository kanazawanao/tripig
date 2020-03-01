import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { InviteGroupComponent } from './invite-group.component';
import { environment } from 'src/environments/environment';

describe('InviteGroupComponent', () => {
  let component: InviteGroupComponent;
  let fixture: ComponentFixture<InviteGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteGroupComponent],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
