import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { Borrowing } from '../models/borrowing';
import { User } from '../models/user';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {

  constructor(private booksService:BooksService,private router:Router) { }

  ngOnInit(): void {
    this.zaduzivanja=[];
    this.knjige=[];
    this.user=JSON.parse(localStorage.getItem("user"));
    if (this.user==null) { this.router.navigate(['']); return;}
    if (this.user.type=="admin") {this.router.navigate(['pocetnaKorisnik']); return;}
    this.booksService.borrowings(this.user.username).subscribe((borrowings:Borrowing[])=>{
      if (borrowings!=null){
        this.zaduzivanja=borrowings;
        this.initialSort();
        this.ready=true;
      } 
    })
  }
  /*--------------------------------------------------- */
  initialSort(){
    this.zaduzivanja.sort((a,b)=>{
      if (a.returned==null) return -1;
      else if (b.returned==null) return 1;
      return a.returned>b.returned? -1:1;
    })
  }
  /*---------------------------------------------------- */
  detalji(borrow:Borrowing){
    for(let i=0;i<this.knjige.length;i++){
      if (this.knjige[i]._id==borrow.bookID){
        localStorage.setItem("book",JSON.stringify(this.knjige[i]));
        break;
      }
    }
    this.router.navigate(['detalji']);
  }
  sortData(sort: Sort) {    
    if (!sort.active || sort.direction === '') {  
      return;  
    }  
  
    this.zaduzivanja = this.zaduzivanja.sort((a, b) => {  
      const isAsc = sort.direction === 'asc';  
      switch (sort.active) {  
        case 'naziv': return this.compare(a.title, b.title, isAsc);  
        case 'autori': return this.compare(a.author[0], b.author[0], isAsc);  
        case 'datumZ': return this.compare(a.date, b.date, isAsc);  
        case 'datumV': return this.compare(a.returned, b.returned, isAsc);  
        default: return 0;  
      }  
    });  
  }  
  
  
compare(a: number | string, b: number | string, isAsc: boolean) {  
  if (a==null) return (isAsc ? 1 : -1);  
  else if (b==null) return -1*(isAsc ? 1 : -1); 
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);  
}  
  user:User;
  zaduzivanja:Borrowing[];
  knjige:Book[];
  ready:boolean=false;
}
