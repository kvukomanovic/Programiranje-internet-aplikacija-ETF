import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { User } from '../models/user';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor( private booksService:BooksService,private router:Router) { }

  ngOnInit(): void {
    let user:User=JSON.parse(localStorage.getItem("user"));
    if (user) this.router.navigate(['pocetnaKorisnik']);
    this.booksService.getTopThree().subscribe((books:Book[])=>{
      this.books=books;
    })
  }

  books:Book[];
}
