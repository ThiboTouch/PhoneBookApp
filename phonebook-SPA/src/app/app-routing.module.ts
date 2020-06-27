import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneBookComponentComponent } from './phone-book-component/phone-book-component.component';
import { PhoneBooksResolver } from './_resolvers/phone-book.resolver';
import { PhoneBookEntriesComponent } from './phone-book-entries/phone-book-entries.component';

const routes: Routes = [
  { path: 'phonebooks', component: PhoneBookComponentComponent, resolve: { phonebooks: PhoneBooksResolver}},
  { path: '', redirectTo: 'phonebooks', pathMatch: 'full' },
  { path: 'entries/:id', component: PhoneBookEntriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
