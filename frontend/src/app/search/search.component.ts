import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private bookService:BooksService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if (this.user!=null)
     this.userService.getUser(this.user._id).subscribe((user:User)=>{
       this.user=user;
      })
    this.bookService.getAllBooks().subscribe((books:Book[])=>{
      books.forEach(book=>{
        book.genre.forEach(genre=>{
          if (!this.genre.find(g=>g==genre))
              this.genre.push(genre);
        })
      })
    })
  }
  title:string;
  author:string;
  message:string;
  searched:boolean=false;
  show:boolean=false;
  user:User;
  searchedBooks:Book[];
  genre:string[]=new Array();
  selectedGenre:string[]=new Array();
  minYear:number=0;
  maxYear:number=2022;
  publisher:string="";

  search(){
    /*  this.bookService.search(this.title,this.author).subscribe((books:Book[])=>{
          this.searchedBooks=books;
          this.searched=true;
          if (this.searchedBooks.length==0){
            this.message="Nema ni jedne knjige po ovoj pretrazi.";
            this.show=false;
          } else {
            this.message="";
            this.show=true;
          }
      })*/
      if (this.minYear==null) this.minYear=0;
      if (this.maxYear==null) this.maxYear=2022;
      this.bookService.search2(this.title,this.author,this.selectedGenre,this.minYear,
        this.maxYear,this.publisher).subscribe((books:Book[])=>{
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
    if (this.user==null || this.user.blocked==true) return;
    localStorage.setItem("book",JSON.stringify(b));
    this.router.navigate(['detalji']);
  }

}
