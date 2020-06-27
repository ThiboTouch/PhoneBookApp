import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phone-book-entries',
  templateUrl: './phone-book-entries.component.html',
  styleUrls: ['./phone-book-entries.component.css']
})
export class PhoneBookEntriesComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log(route.snapshot.params['id']);
  }

  ngOnInit(): void {
  }

}
