import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { Borrowing } from '../models/borrowing';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pocetna-korisnik',
  templateUrl: './pocetna-korisnik.component.html',
  styleUrls: ['./pocetna-korisnik.component.css']
})
export class PocetnaKorisnikComponent implements OnInit {

  constructor(private bookService:BooksService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    let user:User=JSON.parse(localStorage.getItem("user"));
    if (user==null) this.router.navigate(['']);
    this.user=user;
    this.userService.getUser(this.user._id).subscribe((userdb:User)=>{
      this.user=userdb;
      this.bookService.getAllBooks().subscribe((books:Book[])=>{
        if (books!=null){
          this.books=books;
          let t=new Date().toISOString().slice(0,10);
          let p=t.split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current);
          this.randomBook=this.books[p%this.books.length];
          this.bookService.borrowings(this.user.username).subscribe((borrowings:Borrowing[])=>{
            if (borrowings){
              this.userService.getRok().subscribe((admin:User)=>{
                let rok=admin.deadline;
                {
                  let i;
                  for(i=0;i<borrowings.length;i++){
                    if (borrowings[i].returned==null) {
                      this.cnt++;
                    if ((new Date().getTime()-new Date(borrowings[i].date).getTime())/(1000*24*60*60) >rok) this.istekaoRok=true;
                    else if ((new Date().getTime()-new Date(borrowings[i].date).getTime())/(1000*24*60*60)+2>=rok) this.isticeRok=true;
                    }
                  }
                }
              })
            }
          })
          this.ready=true;
        } 
  
      })
    })
    
   
  }

  books:Book[]=new Array();
  randomBook:Book;
  ready:boolean=false;
  user:User;
  istekaoRok:boolean=false;
  isticeRok:boolean=false;
  cnt:number=0;

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
