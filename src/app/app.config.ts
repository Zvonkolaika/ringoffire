import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-75a0e","appId":"1:206679004644:web:01552d90298b16a46123f1","storageBucket":"ring-of-fire-75a0e.appspot.com","apiKey":"AIzaSyCK7E1vOsvAF83AAwgswm3OIdNTAonmvts","authDomain":"ring-of-fire-75a0e.firebaseapp.com","messagingSenderId":"206679004644"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
