import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor( private booksService:BooksService) { }

  ngOnInit(): void {
    this.booksService.getTopThree().subscribe((books:Book[])=>{
      this.books=books;
    })
  }

  books:Book[];
}
