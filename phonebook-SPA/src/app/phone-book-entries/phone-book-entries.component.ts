import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneBook } from '../_models/phonebook';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { AlertifyService } from '../_services/alertify.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PhoneBookEntry } from '../_models/phonebookentry';

@Component({
  selector: 'app-phone-book-entries',
  templateUrl: './phone-book-entries.component.html',
  styleUrls: ['./phone-book-entries.component.css']
})
export class PhoneBookEntriesComponent implements OnInit {
  phonebook: PhoneBook;
  phoneBookEntry: PhoneBookEntry;

  temp = [];
  toggleAddEntry: boolean;
  confirmDelete = false;

  @ViewChild(DatatableComponent) phoneNumbersTable: DatatableComponent;

  constructor(private route: ActivatedRoute, private repo: PhoneBookRepoService, private alertify: AlertifyService) {
    this.route.data.subscribe(data => {
      this.temp = data['phonebook'].entries;
      this.phonebook = data['phonebook'];
    });
  }

  ngOnInit(): void {
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
