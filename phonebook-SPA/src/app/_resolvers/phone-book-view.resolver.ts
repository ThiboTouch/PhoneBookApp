import { Injectable } from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';


@Injectable()
export class PhoneBookViewResolver implements Resolve<PhoneBook> {

  constructor(private repo: PhoneBookRepoService, private router: Router, private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PhoneBook> {
    const id = route.params['id'];
    return this.repo.getPhoneBook(id).pipe(
        catchError(error => {
            this.alertify.error('Problem retrieving your data');
            this.router.navigate(['/phonebooks']);
            return of(null);
        })
    );
  }
}
