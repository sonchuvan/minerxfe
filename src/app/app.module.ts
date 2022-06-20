import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CountdownModule} from 'ngx-countdown';
import {HttpClientModule} from "@angular/common/http";
import {InputNameComponent} from "./input-name.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    InputNameComponent

  ],
  imports: [
    BrowserModule,
    CountdownModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
