import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookComponentComponent } from './phone-book-component/phone-book-component.component';
import { AddphonebookComponent } from './addphonebook/addphonebook.component';
import { PhoneBookRepoService } from './_services/phone-book-repo.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponentComponent,
    AddphonebookComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PhoneBookRepoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
