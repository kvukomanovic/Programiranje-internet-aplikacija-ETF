import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { User } from '../models/user';

@Component({
  selector: 'app-zahtev-za-knjigu',
  templateUrl: './zahtev-za-knjigu.component.html',
  styleUrls: ['./zahtev-za-knjigu.component.css']
})
export class ZahtevZaKnjiguComponent implements OnInit {

  constructor(private booksService:BooksService,private router:Router) { }


  ngOnInit(): void {
    let user:User=JSON.parse(localStorage.getItem("user"));
    if (user==null){ this.router.navigate(['']); return;}
    if (user.type!="citalac" || user.blocked){ this.router.navigate(['pocetnaKorisnik']);return;}
    this.user=user;
    this.image='/assets/book.jpg';
  }

  user:User;
  title:string="";
  author:String[]=new Array(3);
  genre:String[]=new Array(3);
  publisher:string="";
  year:string="";
  language:string="";
  picture:File;
  image:any;
  message:string="";
  
  validator(){
    this.message="";
    if (this.title=="" || this.author[0]=="" || this.genre[0]==""
    || this.publisher=="" || this.year=="" || this.language==""){
     this.message+="Unesite sve podatke!\n";
    }
    if (this.year>new Date().toISOString().slice(0,4)) {
      this.message+="Godina izdavanja ne moze biti u buducnosti!\n";
    }
    if(this.image==null) {
      this.image='/assets/book.jpg';
    }
  }
  /**-------------------------------------------- */
  change(event){
    let input = event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onloadend = (e) => {
        this.image = reader.result;
      }

    }
  }
  /*----------------------------------------- */
  dodajKnjigu(){
     this.validator();
     if (this.message==""){ 
      this.booksService.addBookRequest(this.title,this.author,this.genre,this.publisher,this.year,this.language,this.image,this.user.username).subscribe((resp)=>{
        if (resp["message"]=="ok"){
           alert("Uspesno poslat zahtev za knjigu!");
           window.location.reload();
        }
      })
     } else alert(this.message);
  }
  /**--------------------------------------- */
  
}
