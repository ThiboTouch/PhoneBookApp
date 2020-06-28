import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { validPhoneNumberValidator } from '../shared/validphoneNumber';
import { PhoneBookEntry } from '../_models/phonebookentry';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { PhoneBook } from '../_models/phonebook';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-phone-book-entry',
  templateUrl: './add-phone-book-entry.component.html',
  styleUrls: ['./add-phone-book-entry.component.css']
})
export class AddPhoneBookEntryComponent implements OnInit {
  @Output() private toggleAddPhonebookEntry: EventEmitter<boolean>;
  @Input() phoneBook: PhoneBook;

  phoneBookEntry: PhoneBookEntry;
  tempEntry: PhoneBookEntry;

  public phoneBookEntryForm: FormGroup;

  constructor(private fb: FormBuilder, private repo: PhoneBookRepoService, private alertify: AlertifyService) {
    this.toggleAddPhonebookEntry = new EventEmitter<boolean>();
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    const PHONENUMBER_REGEXP = /^(27|0)[0-9]{9}$/;
    this.phoneBookEntryForm = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(128),
      ]],
      phoneNumber: [null, [
        Validators.required,
        validPhoneNumberValidator(PHONENUMBER_REGEXP)
      ]]
    });
  }

  onToggleAdd(event) {
    this.phoneBookEntryForm.reset();
    this.phoneBookEntry = null;
    this.toggleAddPhonebookEntry.emit(false);
  }

  onEdit(item) {
    this.phoneBookEntry = {name: item.name, phoneNumber: item.phoneNumber};
    this.phoneBookEntryForm.patchValue({
      name: this.phoneBookEntry.name,
      phoneNumber: this.phoneBookEntry.phoneNumber
    });
  }

  onSubmit() {
    if (!this.phoneBookEntry) {
      this.phoneBookEntry = {
        name: this.phoneBookEntryForm.get('name').value,
        phoneNumber: this.phoneBookEntryForm.get('phoneNumber').value
      };

      this.repo.addPhoneBookEntry(this.phoneBook.id, this.phoneBookEntry).subscribe(res => {
        this.phoneBook.entries = res;
        this.alertify.success('item was successfully added');
      }, error => {
        this.alertify.error(error);
      });

      this.phoneBookEntry = null;
      this.phoneBookEntryForm.reset();
    } else {
      this.tempEntry = Object.assign({}, this.phoneBookEntry);
      this.phoneBookEntry.name = this.phoneBookEntryForm.get('name').value;
      this.phoneBookEntry.phoneNumber = this.phoneBookEntryForm.get('phoneNumber').value;
      this.repo.patchPhoneBookEntry(this.phoneBook.id, this.tempEntry.phoneNumber, this.phoneBookEntry).subscribe(res => {
        this.phoneBook.entries = res;
        this.tempEntry = null;
        this.alertify.success('item was successfully updated');
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
