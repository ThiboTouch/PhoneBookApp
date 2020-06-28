import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneBook } from '../_models/phonebook';
import { PhoneBookRepoService } from '../_services/phone-book-repo.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-phone-book-entries',
  templateUrl: './phone-book-entries.component.html',
  styleUrls: ['./phone-book-entries.component.css']
})
export class PhoneBookEntriesComponent implements OnInit {
  phonebook: PhoneBook;
  id: string;

  constructor(private route: ActivatedRoute, private repo: PhoneBookRepoService, private alertify: AlertifyService) {
    this.route.data.subscribe(data => {
      this.phonebook = data['phonebook'];
    });
  }

  ngOnInit(): void {
  }

}
