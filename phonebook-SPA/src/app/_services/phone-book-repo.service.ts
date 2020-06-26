import { Injectable } from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const  baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PhoneBookRepoService {
  phoneBook: PhoneBook;
  phoneBooks: PhoneBook[];

  constructor(private http: HttpClient) {}

  getPhoneBooks() {
    this.http.get<PhoneBook[]>(`${baseUrl}/phonebook`).subscribe((p) => {
      this.phoneBooks = p;
    });
  }
}
