import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { AddphonebookComponent } from '../addphonebook/addphonebook.component';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';

@Component({
  selector: 'app-phone-book-component',
  templateUrl: './phone-book-component.component.html',
  styleUrls: ['./phone-book-component.component.css'],
})
export class PhoneBookComponentComponent implements OnInit, AfterViewInit {
  phonebook: PhoneBook;

  toggleAddPhonebook = false;
  confirmDelete = false;
  editMode = false;

  @ViewChildren('addPhoneBook')
  public addPhoneBooks: QueryList<AddphonebookComponent>;

  private addPhoneBookComponent: AddphonebookComponent;

  constructor(private repo: PhoneBookRepoService) {
    this.repo.getPhoneBooks();
  }

  ngOnInit(): void {  }

  get phonebooks(): PhoneBook[] {
    if (this.repo.phoneBooks != null && this.repo.phoneBooks.length > 0) {
      return this.repo.phoneBooks;
    }
  }

  public ngAfterViewInit(): void {
    this.addPhoneBooks.changes.subscribe(
      (comps: QueryList<AddphonebookComponent>) => {
        if (comps.first !== undefined && comps.first !== null) {
          this.addPhoneBookComponent = comps.first;
          if (this.editMode) {
            this.addPhoneBookComponent.onEdit(this.phonebook);
            this.editMode = false;
          }
        }
      }
    );
  }

  onEdit(item) {
    this.toggleAdd();
    this.editMode = true;
    this.phonebook = item;
  }

  toggleAdd() {
    this.toggleAddPhonebook = true;
  }

  onToggleAdd(toggle) {
    this.toggleAddPhonebook = toggle;
  }

  onConfirmDelete(item) {
    this.phonebook = item;
    this.confirmDelete = true;
  }

  deletePhoneBook() {
    this.repo.deletePhoneBook(this.phonebook.id).subscribe(next => {
      const index = this.phonebooks.indexOf(this.phonebook);
      if (index > -1) {
        this.phonebooks.splice(index, 1);
      }
      this.confirmDelete = false;
    }, error => {
      console.log(error);
    });
  }
}
