import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { User } from '../models/user';

@Component({
  selector: 'app-dodaj-knjigu',
  templateUrl: './dodaj-knjigu.component.html',
  styleUrls: ['./dodaj-knjigu.component.css']
})
export class DodajKnjiguComponent implements OnInit {

  constructor(private booksService:BooksService,private router:Router) { }

  ngOnInit(): void {
    let user:User=JSON.parse(localStorage.getItem("user"));
    if (user==null) this.router.navigate(['']);
    else if (user.type=="citalac") this.router.navigate(['pocetnaKorisnik']);
  }

  title:string;
  author:String[]=new Array(3);
  genre:String[]=new Array(3);
  publisher:string;
  year:string;
  language:string;
  picture:File;
  image_data;
  image:any;
  available:number;
  correctInput:boolean=true;

  
  validator(){
    let message="";
    if (this.title=="" || this.author[0]=="" || this.genre[0]==""
    || this.publisher=="" || this.year=="" || this.language=="" || this.available==null){
      this.correctInput=false;
      message+="Unesite sve podatke!\n";
    }
    if (this.year>new Date().toISOString().slice(0,4)) {
      this.correctInput=false;
      message+="Godina izdavanja ne moze biti u buducnosti!\n";
    }
    if (this.available<0){
      this.correctInput=false;
      message+="Godina izdavanja ne moze biti u proslosti!\n";
    }
    if(this.image_data==null) {
      this.correctInput=false;
      message+="Unesite sliku korica knjige!\n";
    }
    if (!this.correctInput) alert(message);
  }
  /**-------------------------------------------- */
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
  /*----------------------------------------- */
  dodajKnjigu(){
    this.correctInput=true;
     this.validator();
     if (this.correctInput){ 
      this.booksService.addBook(this.title,this.author,this.genre,this.publisher,this.year,this.language,this.image,this.available).subscribe((resp)=>{
        if (resp["message"]=="ok"){
           alert("Uspesno dodata knjiga!");
           window.location.reload();
        }
      })
     }
  }
  /**--------------------------------------- */
  
}
