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
import { lookupService } from 'dns';

@Component({
  selector: 'app-phone-book-component',
  templateUrl: './phone-book-component.component.html',
  styleUrls: ['./phone-book-component.component.css'],
})
export class PhoneBookComponentComponent implements OnInit, AfterViewInit {
  phonebooks: PhoneBook[];
  phonebook: PhoneBook;

  toggleAddPhonebook = false;
  confirmDelete = false;
  editMode = false;

  @ViewChildren('addPhoneBook')
  public addPhoneBooks: QueryList<AddphonebookComponent>;

  private addPhoneBookComponent: AddphonebookComponent;

  constructor() {}

  ngOnInit(): void {
    this.phonebooks = [
      {
        id: 'b51ef698-1b84-4b92-991e-a1599f218265',
        name: 'Family',
        entries: [
          {
            name: 'John',
            phoneNumber: '27785254123',
          },
          {
            name: 'George',
            phoneNumber: '0785241236',
          },
          {
            name: 'foo',
            phoneNumber: '0781252144',
          },
        ],
      },
      {
        id: 'b51ef698-1b84-4b92-991e-a1599f218265',
        name: 'Friends',
        entries: [
          {
            name: 'John',
            phoneNumber: '27785254123',
          },
          {
            name: 'George',
            phoneNumber: '0785241236',
          },
          {
            name: 'foo',
            phoneNumber: '0781252144',
          },
        ],
      },
    ];
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
    const index = this.phonebooks.indexOf(this.phonebook);
    if (index > -1) {
      this.phonebooks.splice(index, 1);
    }
    this.confirmDelete = false;
  }
}
