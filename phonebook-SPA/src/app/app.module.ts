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
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HomeComponent } from './home/home.component';
import { PhoneBookViewResolver } from './_resolvers/phone-book-view.resolver';
import { NgxDatatableModule  } from '@swimlane/ngx-datatable';
import { AddPhoneBookEntryComponent } from './add-phone-book-entry/add-phone-book-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponentComponent,
    AddphonebookComponent,
    PhoneBookEntriesComponent,
    HomeComponent,
    AddPhoneBookEntryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxDatatableModule,
    PaginationModule.forRoot()
  ],
  providers: [
    PhoneBookRepoService,
    PhoneBooksResolver,
    PhoneBookViewResolver,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
