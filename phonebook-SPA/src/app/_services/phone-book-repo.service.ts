import { Injectable } from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

const  baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PhoneBookRepoService {
  phoneBook: PhoneBook;
  phoneBooks: PhoneBook[];

  constructor(private http: HttpClient) {}

  getPhoneBooks() {
    this.http.get<PhoneBook[]>(`${baseUrl}`).subscribe((p) => {
      this.phoneBooks = p;
    });
  }

  addPhoneBook(phonebook: PhoneBook): Observable<string> {
    return this.http.post<string>(`${baseUrl}`, phonebook);
  }

  updatePhoneBook(id: string, model: PhoneBook) {
    return this.http.put(baseUrl + `/${id}`, model);
  }

  deletePhoneBook(id: string) {
    return this.http.delete(baseUrl + `/${id}`);
  }
}
