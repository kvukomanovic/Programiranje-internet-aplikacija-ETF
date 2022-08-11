import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { User } from '../models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private bookService:BooksService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
  }
  title:string;
  author:string;
  message:string;
  searched:boolean=false;
  show:boolean=false;
  user:User;
  searchedBooks:Book[];
  search(){
      this.bookService.search(this.title,this.author).subscribe((books:Book[])=>{
          this.searchedBooks=books;
          this.searched=true;
          if (this.searchedBooks.length==0){
            this.message="Nema ni jedne knjige po ovoj pretrazi.";
            this.show=false;
          } else {
            this.message="";
            this.show=true;
          }
      })
  }
  detalji(b:Book){
    localStorage.setItem("book",JSON.stringify(b));
    this.router.navigate(['detalji']);
  }

}
