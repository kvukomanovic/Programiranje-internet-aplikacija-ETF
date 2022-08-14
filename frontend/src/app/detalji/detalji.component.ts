import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../models/book';
import { Borrowing } from '../models/borrowing';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.css']
})
export class DetaljiComponent implements OnInit {

  constructor(private bookService:BooksService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.book=JSON.parse(localStorage.getItem("book"));
    this.user=JSON.parse(localStorage.getItem("user"));
    if (this.user==null){ this.router.navigate(['']); return;}
    if (this.book==null){ this.router.navigate(['pocetnaKorisnik']); return;}
 
    if (this.user!=null){
      this.ready=true;
      if (this.user.type!="admin")
        this.daLiMozeDaIznajmi();
    } 
    this.book.comments.sort((a,b) => -(new Date(a.timestamp).getTime()-new Date(b.timestamp).getTime()));
  }

  book:Book;
  user:User;
  rented:Book[];
  borrowings:Borrowing[]=new Array();
  nevracene:Borrowing[]=new Array();
  prikaziDugme:boolean;
  message:string;
  prosecnaOcena:number;
  imaKomentara:boolean;
  ready:boolean=false;
  rating:number;
  comment:string;
  mozeDaKomentarise:boolean;
  image_data;
  image:any;

  zaduzi(){
    let rok;
    let cando=true;
    if (this.nevracene.length==3) cando=false;
    else{
    this.userService.getRok().subscribe((admin:User)=>{
      rok=admin.deadline;
      this.nevracene.forEach(borrow=>{
        if ((new Date(new Date().toISOString().slice(0,10)).getTime() - new Date(borrow.date).getTime())/(1000*3600*24)
        > rok){
          cando=false;
        }
      })  
      
    })
  }
    if (!cando) this.message="Ne mozete zaduziti knjigu."
    else this.bookService.zaduzi(this.user.username,this.book).subscribe((resp)=>{
      if (resp["message"]=="ok") {alert("Uspesno ste zaduzili knjigu!"); this.getBook();}
      else this.message="Neuspesno zaduzivanje. Pokusajte ponovo";
    })
   
  }

  /*------------------------------------------------------------------- */
  prosecnaOcenaF():number{
    if (this.book.comments.length==0 || this.book.comments==null) return 0;
    let o=0;
    this.book.comments.forEach((c)=>{
      o+=c.rating;
    })
    o/=this.book.comments.length;
    return o;
  }
  /*------------------------------------------------------------------- */

  addComment(){
    this.bookService.addComment(this.user.username,this.book._id,this.rating,this.comment).subscribe((resp)=>{
      if (resp['message']=='ok') {
        alert("Uspesno ste dodali komentar!");       
        this.getBook();
      }
      else {
        alert("Neuspesno dodat komentar, pokusajte ponovo!");
         
      }
    })
   
  }
 /*----------------------------------------------------------------------- */
  mozeDaKomentariseF():boolean{
    if (this.user==null || this.user.type=="admin") return false;
    let komentarisao=false;
    this.book.comments.forEach((c)=>{
      if (c.username==this.user.username) {
        komentarisao=true;
      }
    })
    let iznajmio=false;
    if (this.borrowings==null) console.log("null")
    this.borrowings.forEach(borrow=>{
      if (borrow.bookID==this.book._id){
        iznajmio=true;
      }
    })
    return (!komentarisao && iznajmio);
  }
  /**------------------------------------------------------------------ */
  imaKomentaraF():boolean{
    return this.book.comments.length>0;
  }
  /**---------------------------------------------------------------- */
  getBook(){
    this.bookService.getBook(this.book._id).subscribe((book:Book)=>{
      this.book=book;
      localStorage.setItem("book",JSON.stringify(book));
      this.ngOnInit();
    })
  }
  /*---------------------------------------------------------------*/
  izmeni(){
    this.izmena=true;
  }
  sacuvaj(){
    //...
    if (this.image_data) this.book.pic=this.image_data;
    this.bookService.editBook(this.book).subscribe((resp)=>{
      if (resp["message"]=="ok")
      this.bookService.getBook(this.book._id).subscribe((book:Book)=>{
        this.book=book;
        localStorage.setItem("book",JSON.stringify(this.book));
      })
    })
    this.izmena=false;
  }
  izmena:boolean=false;
  /*-------------------------------------------------------------- */
  change(event){
    let input = event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onloadend = (e) => {
        this.image_data = reader.result;
        this.image = reader.result;
      }

    }
  }
  /*-------------------------------------------------------------- */
 
  daLiMozeDaIznajmi(){
    this.bookService.borrowings(this.user.username).subscribe((borrowings:Borrowing[])=>{
      if (borrowings!=null) this.borrowings=borrowings;
      let moze=true;
      this.borrowings.forEach(borrow=>{
        if (borrow.returned==null) {
          this.nevracene.push(borrow);
          if (borrow.bookID==this.book._id) moze=false;
        }
      })

      this.prikaziDugme=(moze && this.book.available>0);
    })
  }
   /*-------------------------------------------------------------- */
  obrisiKnjigu(){
    let brisi=confirm("Da li ste sigurni da zelite da obrisete knjigu?");
    if (brisi){
      this.bookService.notReturnedBorrowingForBook(this.book._id).subscribe((borrowings:Borrowing[])=>{
        if (borrowings){
          alert("Postoji zaduzenje na ovu knjigu! Nije je moguce obrisati!");
          return;
        }else{
          this.bookService.deleteBook(this.book).subscribe((resp)=>{
            if (resp['message']=="ok") this.router.navigate(['search']);
          })
        }
      })
    }
  }
  /*--------------------------------------------------------------- */
}
