import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookComponentComponent } from './phone-book-component/phone-book-component.component';
import { AddphonebookComponent } from './addphonebook/addphonebook.component';
import { PhoneBookRepoService } from './_services/phone-book-repo.service';
import { HttpClientModule } from '@angular/common/http';
import { PhoneBookEntriesComponent } from './phone-book-entries/phone-book-entries.component';
import { PhoneBooksResolver } from './_resolvers/phone-book.resolver';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponentComponent,
    AddphonebookComponent,
    PhoneBookEntriesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  providers: [
    PhoneBookRepoService,
    PhoneBooksResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
