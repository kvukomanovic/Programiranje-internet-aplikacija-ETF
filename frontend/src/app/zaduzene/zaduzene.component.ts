import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { Borrowing } from '../models/borrowing';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-zaduzene',
  templateUrl: './zaduzene.component.html',
  styleUrls: ['./zaduzene.component.css']
})
export class ZaduzeneComponent implements OnInit {

  constructor(private booksService:BooksService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.zaduzenja=[];
    this.knjige=[];
    this.user=JSON.parse(localStorage.getItem("user"));
    if (this.user==null) { this.router.navigate(['']); return;}
    if (this.user.type=="admin") {this.router.navigate(['pocetnaKorisnik']); return;}
    this.booksService.borrowings(this.user.username).subscribe((books:Borrowing[])=>{
      if (books!=null){
        books.forEach(book=>{
          if (book.returned==null){
             this.zaduzenja.push(book);
             this.booksService.getBook(book.bookID).subscribe((book2:Book)=>{
               this.knjige.push(book2);
             })
            }
        })
        this.userService.getRok().subscribe((admin:User)=>{
          this.rok=admin.deadline;
          this.ready=true;

        })
         

      }
    })

  }
  pic(zaduzenje:Borrowing):any{
    let bookID=zaduzenje.bookID;
    for(let i=0;i<this.knjige.length;i++){
      if (this.knjige[i]._id==bookID) return this.knjige[i].pic;
    }
    
    
  }

  razduzi(b:Borrowing){
    this.booksService.razduzi(b).subscribe((resp)=>{
      if (resp["message"]=="ok") this.ngOnInit();
    })
  }
  dana(b:Borrowing):number{
    let datum=new Date(b.date);
    let vracanje = new Date(datum);
    vracanje.setDate(datum.getDate() + this.rok);    
    let dana=Math.floor((vracanje.getTime()-new Date().getTime())/(1000*60*60*24));
    return dana;  
   
  }
  user:User;
  ready:boolean=false;
  zaduzenja:Borrowing[]=new Array();
  knjige:Book[]=new Array();
  rok:number;
}
