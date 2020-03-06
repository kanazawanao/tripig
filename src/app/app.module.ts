import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from './parts/dialog/dialog.module';
import { TripigStoreModule } from './store';
import { ConditionStoreModule } from './store/condition';
import { PlaceStoreModule } from './store/place';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MaterialModule } from 'src/app/material/material.module';
import { HeaderModule } from 'src/app/parts/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    TripigStoreModule,
    ConditionStoreModule,
    PlaceStoreModule,
    DialogModule,
    HeaderModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    Geolocation,
    GooglePlus,
    InAppBrowser,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
