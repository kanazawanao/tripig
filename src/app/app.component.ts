import { Place } from './models/class/place.model';
import { MapRouteResultComponent } from './parts/dialog/map/map-route-result/map-route-result.component';
import { AuthService } from './services/auth.service';
import { PlaceFacade } from './store/place/facades';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  selectedList$: Observable<Place[]> = this.placeFacade.selectedPlaceList$;
  showResultRoute = false;
  private onDestroy$ = new Subject();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private placeFacade: PlaceFacade,
    public dialog: MatDialog,
  ) {
    this.authService.checkLogin();
    this.initializeApp();
  }

  ngOnInit(): void {
    this.selectedList$.pipe(takeUntil(this.onDestroy$)).subscribe((list) => {
      console.log(list);
      this.showResultRoute = list.length > 0;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openRouteResultDialog(): void {
    this.dialog.open(MapRouteResultComponent);
  }
}
