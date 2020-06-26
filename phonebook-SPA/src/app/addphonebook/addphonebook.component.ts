import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-addphonebook',
  templateUrl: './addphonebook.component.html',
  styleUrls: ['./addphonebook.component.css'],
})
export class AddphonebookComponent implements OnInit {
  @Output() private toggleAddPhonebook: EventEmitter<boolean>;
  @Input() phonebooks: PhoneBook[];
  phonebook: PhoneBook;

  public phoneBookForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(128),
    ]),
  });

  constructor() {
    this.toggleAddPhonebook = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  onToggleAdd(event) {
    this.toggleAddPhonebook.emit(false);
    this.phoneBookForm.reset();
    this.phonebook = null;
  }

  onEdit(item) {
    this.phonebook = item;
    this.phoneBookForm.patchValue({
      name: this.phonebook.name,
    });
  }

  onSubmit() {
    if (!this.phonebook) {
      this.phonebook = {
        id: null,
        name: this.phoneBookForm.get('name').value,
        entries: null,
      };
      this.phonebooks.push(this.phonebook);
    } else {
      this.phonebook.name = this.phoneBookForm.get('name').value;
      const index = this.phonebooks.indexOf(this.phonebook);
      if (index !== -1) {
        this.phonebooks[index] = this.phonebook;
      }
    }
    this.phonebook = null;
    this.phoneBookForm.reset();
  }
}
