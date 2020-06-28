import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneBook } from '../_models/phonebook';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { AlertifyService } from '../_services/alertify.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PhoneBookEntry } from '../_models/phonebookentry';
import { AddPhoneBookEntryComponent } from '../add-phone-book-entry/add-phone-book-entry.component';

@Component({
  selector: 'app-phone-book-entries',
  templateUrl: './phone-book-entries.component.html',
  styleUrls: ['./phone-book-entries.component.css']
})
export class PhoneBookEntriesComponent implements OnInit, AfterViewInit {
  phonebook: PhoneBook;
  phoneBookEntry: PhoneBookEntry;

  temp = [];
  toggleAddEntry: boolean;
  confirmDelete = false;
  editMode = false;

  @ViewChild(DatatableComponent) phoneNumbersTable: DatatableComponent;

  @ViewChildren('addPhoneBookEntry')
  public addPhoneBookEntries: QueryList<AddPhoneBookEntryComponent>;
  private addPhoneBookEntryComponent: AddPhoneBookEntryComponent;

  constructor(private route: ActivatedRoute, private repo: PhoneBookRepoService, private alertify: AlertifyService) {
    this.route.data.subscribe(data => {
      this.temp = data['phonebook'].entries;
      this.phonebook = data['phonebook'];
    });
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.addPhoneBookEntries.changes.subscribe(
      (comps: QueryList<AddPhoneBookEntryComponent>) => {
        if (comps.first !== undefined && comps.first !== null) {
          this.addPhoneBookEntryComponent = comps.first;
          if (this.editMode) {
            this.addPhoneBookEntryComponent.onEdit(this.phoneBookEntry);
            this.editMode = false;
          }
        }
      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter( (d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.phonebook.entries = temp;
    // Whenever the filter changes, always go back to the first page
    this.phoneNumbersTable.offset = 0;
  }

  onEdit(item) {
    this.toggleAdd();
    this.editMode = true;
    this.phoneBookEntry = {name: item.name, phoneNumber: item.phonenumber};
  }


  toggleAdd() {
    this.toggleAddEntry = true;
  }

  onToggleAdd(toggle) {
    this.toggleAddEntry = toggle;
  }

  onConfirmDelete(item) {
    this.phoneBookEntry = {name: item.name, phoneNumber: item.phonenumber};
    this.confirmDelete = true;
  }

  loadPhoneBook() {
    this.repo
      .getPhoneBook(this.phonebook.id)
      .subscribe(
        (res: PhoneBook) => {
          this.phonebook = res;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  deletePhoneBookEntry() {
    this.repo.deletePhoneBookEntry(this.phonebook.id, this.phoneBookEntry.phoneNumber).subscribe(
      (next) => {
        this.confirmDelete = false;
        this.alertify.success('item was successfully deleted');
        this.loadPhoneBook();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

}
