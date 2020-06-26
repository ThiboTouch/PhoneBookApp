import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookComponentComponent } from './phone-book-component/phone-book-component.component';
import { AddphonebookComponent } from './addphonebook/addphonebook.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponentComponent,
    AddphonebookComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
