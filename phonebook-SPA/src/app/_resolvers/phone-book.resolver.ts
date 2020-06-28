import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PhoneBook } from '../_models/phonebook';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class PhoneBooksResolver implements Resolve<PhoneBook[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private repo: PhoneBookRepoService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PhoneBook[]> {
    return this.repo.getPhoneBooks(this.pageSize, this.pageNumber).pipe(
      catchError((error) => {
        this.alertify.error(error);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
