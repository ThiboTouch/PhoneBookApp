import { Injectable } from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

const  baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PhoneBookRepoService {
  phoneBook: PhoneBook;
  phoneBooks: PhoneBook[];

  constructor(private http: HttpClient) {}

  getPhoneBooks(recordsPerPage?, page?): Observable<PaginatedResult<PhoneBook[]>> {
    const paginatedResult: PaginatedResult<PhoneBook[]> = new PaginatedResult<PhoneBook[]>();
    let params = new HttpParams();

    if (recordsPerPage != null && page != null) {
      params = params.append('recordsPerPage', recordsPerPage);
      params = params.append('page', page);
    }

    return this.http
      .get<PhoneBook[]>(`${baseUrl}`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('totalAmountPages') != null && response.headers.get('totalItems') != null) {
            paginatedResult.pagination = {
              totalItems: parseInt(response.headers.get('totalItems'), 10),
              recordsPerPage,
              page,
              totalAmountPages: parseInt(response.headers.get('totalAmountPages'), 10)
            };
          }
          return paginatedResult;
        })
      );
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