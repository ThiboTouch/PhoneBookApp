import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';
import { PhoneBook } from '../_models/phonebook';
import { AddphonebookComponent } from '../addphonebook/addphonebook.component';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-phone-book-component",
  templateUrl: "./phone-book-component.component.html",
  styleUrls: ["./phone-book-component.component.css"],
})
export class PhoneBookComponentComponent implements OnInit, AfterViewInit {
  phonebook: PhoneBook;
  phonebooks: PhoneBook[];
  pagination: Pagination;

  toggleAddPhonebook = false;
  confirmDelete = false;
  editMode = false;
  newItemAdded = false;

  @ViewChildren("addPhoneBook")
  public addPhoneBooks: QueryList<AddphonebookComponent>;

  private addPhoneBookComponent: AddphonebookComponent;

  constructor(
    private repo: PhoneBookRepoService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.phonebooks = data["phonebooks"].result;
      this.pagination = data["phonebooks"].pagination;
    });
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

  pageChanged(event: any): void {
    this.pagination.page = event.page;
    this.loadPhoneBooks();
  }

  loadPhoneBooks() {
    this.repo
      .getPhoneBooks(this.pagination.recordsPerPage, this.pagination.page)
      .subscribe(
        (res: PaginatedResult<PhoneBook[]>) => {
          this.phonebooks = res.result;
          this.pagination = res.pagination;
          if (this.newItemAdded) {
            this.pagination.page = res.pagination.totalAmountPages;
            this.ref.detectChanges();
            this.newItemAdded = false;
          }
        },
        (error) => {
          console.log(error);
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

  onAddedNewPhoneBook(event) {
    this.newItemAdded = true;
    this.loadPhoneBooks();
  }

  deletePhoneBook() {
    this.repo.deletePhoneBook(this.phonebook.id).subscribe(
      (next) => {
        this.loadPhoneBooks();
        this.confirmDelete = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
