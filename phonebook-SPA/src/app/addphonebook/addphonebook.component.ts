import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { Pagination } from '../_models/pagination';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-addphonebook',
  templateUrl: './addphonebook.component.html',
  styleUrls: ['./addphonebook.component.css'],
})
export class AddphonebookComponent implements OnInit {
  @Output() private toggleAddPhonebook: EventEmitter<boolean>;
  @Output() private addedNewPhoneBook: EventEmitter<PhoneBook>;
  @Input() private pagination: Pagination;
  @Input() phonebooks: PhoneBook[];
  phonebook: PhoneBook;

  public phoneBookForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(128),
    ]),
  });

  constructor(private repo: PhoneBookRepoService) {
    this.toggleAddPhonebook = new EventEmitter<boolean>();
    this.addedNewPhoneBook = new EventEmitter<PhoneBook>();
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

      this.repo.addPhoneBook(this.phonebook).subscribe(res => {
        const evenData = this.phonebook;
        this.addedNewPhoneBook.emit(evenData);
      }, error => {
        console.log(error);
      });

      this.phonebook = null;
      this.phoneBookForm.reset();

    } else {
      this.phonebook.name = this.phoneBookForm.get('name').value;
      this.repo.updatePhoneBook(this.phonebook.id, this.phonebook).subscribe(next => {
        const index = this.phonebooks.indexOf(this.phonebook);
        if (index !== -1) {
          this.phonebooks[index] = this.phonebook;
        }
      }, error => {
        console.log(error);
      });
    }
  }
}