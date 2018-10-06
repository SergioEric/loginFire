import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire'; //modulo bootstrap de firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment'; // la configuracion de firebase para nuestro proyecto

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
