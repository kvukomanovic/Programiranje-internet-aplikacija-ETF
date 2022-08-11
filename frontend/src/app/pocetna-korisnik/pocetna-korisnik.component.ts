import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-pocetna-korisnik',
  templateUrl: './pocetna-korisnik.component.html',
  styleUrls: ['./pocetna-korisnik.component.css']
})
export class PocetnaKorisnikComponent implements OnInit {

  constructor(private bookService:BooksService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((books:Book[])=>{
      if (books!=null){
        this.books=books;
        let t=new Date().toISOString().slice(0,10);
        let p=t.split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current);
        this.randomBook=this.books[p%this.books.length];
        this.ready=true;
      } 

    })
   
  }

  books:Book[]=new Array();
  randomBook:Book;
  ready:boolean=false;

  prosecnaOcena():number{
    if (this.randomBook.comments.length==0 || this.randomBook.comments==null) return 0;
    let o=0;
    this.randomBook.comments.forEach((c)=>{
      o+=c.rating;
    })
    o/=this.randomBook.comments.length;
    return o;
  }
  
}
