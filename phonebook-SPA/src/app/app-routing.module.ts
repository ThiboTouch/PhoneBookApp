import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneBookComponentComponent } from './phone-book-component/phone-book-component.component';
import { PhoneBooksResolver } from './_resolvers/phone-book.resolver';
import { PhoneBookEntriesComponent } from './phone-book-entries/phone-book-entries.component';
import { HomeComponent } from './home/home.component';
import { PhoneBookViewResolver } from './_resolvers/phone-book-view.resolver';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'phonebooks', component: PhoneBookComponentComponent, resolve: { phonebooks: PhoneBooksResolver}},
  { path: 'entries/:id', component: PhoneBookEntriesComponent, resolve: {phonebook: PhoneBookViewResolver}},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
