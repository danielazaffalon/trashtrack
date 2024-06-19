import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"trashtrack-71125","appId":"1:1098812061883:web:fbafc108cc965589c5119e","storageBucket":"trashtrack-71125.appspot.com","apiKey":"AIzaSyDUnnDAOXOcPyvDay0wroITRswEw5YgmO4","authDomain":"trashtrack-71125.firebaseapp.com","messagingSenderId":"1098812061883","measurementId":"G-XV2VH4R1CF"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
