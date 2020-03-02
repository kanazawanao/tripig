import { InviteGroupComponent } from './invite-group.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';


describe('InviteGroupComponent', () => {
  const mockDialogRef = {
    data: {},
    close: jasmine.createSpy('close'),
  };
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
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
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
