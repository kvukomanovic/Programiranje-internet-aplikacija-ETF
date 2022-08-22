import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { BookRequest } from '../models/book_request';
import { User } from '../models/user';

@Component({
  selector: 'app-pregled-zahteva-za-knjigom',
  templateUrl: './pregled-zahteva-za-knjigom.component.html',
  styleUrls: ['./pregled-zahteva-za-knjigom.component.css']
})
export class PregledZahtevaZaKnjigomComponent implements OnInit {

  constructor(private router:Router, private bookService:BooksService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if (this.user==null){ this.router.navigate(['']); return;}
    if (this.user.type!='moderator' || this.user.blocked){ this.router.navigate(['pocetnaKorisnik']);return;}
    this.bookService.getAllBookRequests().subscribe((requests:BookRequest[])=>{
      this.zahtevi=requests;
    })
  }
  user:User;
  zahtevi:BookRequest[];
  /*------------------------------------------------ */
  dodaj(request:BookRequest){
    this.bookService.addBook(request.title,request.author,request.genre,request.publisher,
      request.year,request.language,request.pic,5).subscribe((resp)=>{
        if (resp['message']=="ok") {
          this.bookService.sendNotificationAboutBook(request).subscribe((resp)=>{
            if (resp['message']=="ok")  this.obrisi(request)
          })
        } else alert(resp['message']);
      })

  }
  /*------------------------------------------------ */
  obrisi(request:BookRequest){
    this.bookService.deleteRequest(request._id).subscribe((requests:BookRequest[])=>{
      this.zahtevi=requests;
    })
    
  }
}
