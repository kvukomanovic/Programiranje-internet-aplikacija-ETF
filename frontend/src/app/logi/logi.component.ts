import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmmiterService } from '../event-emmiter.service';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logi',
  templateUrl: './logi.component.html',
  styleUrls: ['./logi.component.css']
})
export class LogiComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,private eventEmmiter:EventEmmiterService) { }


  ngOnInit(): void {
    let user:User=JSON.parse(localStorage.getItem("user"));
    if (user!=null){this.router.navigate(['pocetnaKorisnik']);return;}
   
  }

  username:string;
  password:string;
 // type:string;
  message:string;

  usernameR:string="";
  passwordR:string="";
  password2R:string="";
  firstnameR:string="";
  lastnameR:string="";
  addressR:string="";
  phoneR:string="";
  emailR:string="";
  image:any;
  image_data;

  messageR:string;

  login(){
    this.userService.proveri(this.username,this.password).subscribe((user:User)=>{
      if (user!=null){
        localStorage.setItem("user",JSON.stringify(user));
        this.message="";
        this.eventEmmiter.sendMessage("logged");
        if (user.type!="admin") this.router.navigate(['pocetnaKorisnik']);
        else this.router.navigate(['']);
      } else this.message="Pogresni kredencijali! Pokusajte ponovo.";
    })

  }
  register(){
    if (!this.proveri()){
      alert(this.messageR);
    } else this.userService.register(this.usernameR,this.password2R,this.firstnameR,this.lastnameR,this.emailR,
        this.phoneR,this.addressR,this.image_data).subscribe((resp)=>{
         alert(resp['message']);
         window.location.reload();
        })
    
    
  }
  /*--------------------------------------------------- */
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
  /*---------------------------------------------- */
  proveri():boolean{
    this.messageR="";
    if (this.usernameR=="" || this.passwordR=="" 
    || this.firstnameR=="" || this.lastnameR=="" 
    || this.addressR=="" || this.phoneR==""
    || this.emailR==""){
      this.messageR+="Unesite sve podatke!\n";
    }
    let user:User=new User();
    user.username=this.usernameR;user.password=this.passwordR;
    user.firstname=this.firstnameR;user.lastname=this.lastnameR;
    user.address=this.addressR; user.phone=this.phoneR;
    user.email=this.emailR; user.type="citalac";
   
    if (this.password2R!=this.passwordR) this.messageR+="Pogresno uneta lozinka!\n";
    //da li je neko polje prazno
    if (user.username=="" || user.password=="" || user.firstname==""
    || user.lastname=="" || user.address=="" || user.phone=="" || user.email=="") this.messageR+="Popunite sva polja!\n";
    // pocetna slova velika imena i prezimena
    let velikoSlovo=new RegExp("^[A-Z][a-z]+$");
    if (!(velikoSlovo.test(user.firstname) && velikoSlovo.test(user.lastname)))
      this.messageR+="Prvo slovo imena i prezime mora biti veliko!\n";
    //format lozinke
    let pass=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z][a-zA-z0-9!@#$%^&]{7,11}$/;
    if (!pass.test(user.password)) this.messageR+="Los format sifre. Lozinka mora pocinjati slovom, sadrzati bar jedno veliko slovo, jedan specijalni karakter(!@#$%^&) i jednu cifru i biti duzine od 8 do 12 cifara.\n";
    // format mejla
    let email=/^[a-zA-z\d]+@[a-z\d](.[a-z])+$/;
    if (!email.test(user.email)) this.messageR+="Los format emaila. Primer: example@gmail.com\n";
    if (user.type=="admin") this.messageR+="Postoji samo jedan admin u sistemu!\n";
    let phone=/^\+3816\d{7,8}$/;
    if (!phone.test(user.phone)) this.messageR+="Telefon nije u redu. Primer: +381644502558, +3816xxxxxxx"
    if (user.username.toLowerCase()!=user.username) this.messageR+="Korisnicko ime ne sme sadrzati velika slova!\n";
    if (this.image_data==null) this.image_data='/assets/user.jpg';
    if (this.messageR!="") return false; else return true;

  }
}
