import { Component, OnInit } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-svi-korisnici',
  templateUrl: './svi-korisnici.component.html',
  styleUrls: ['./svi-korisnici.component.css']
})
export class SviKorisniciComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users:User[])=>{
      if ((this.users=users)!=null){
        this.users.forEach((user)=>{
          this.izmeni.set(user._id,false);
        })
        this.ready=true;
      }
    })
  }
  
  //izmeni:boolean=false;
  ready:boolean=false;
  users:User[];
  usernameFromForm:string;
  passwordFromForm:string;
  firstnameFromForm:string;
  lastnameFromForm:string;
  emailFromForm:string;
  phoneFromForm:string;
  addressFromForm:string;
  typeFromForm:string;
  editMessage:string;
  izmeni:Map<String,boolean>=new Map();
  izmeniF(id){
    this.izmeni.set(id,true);
  }
  obrisi(id){

  }
  nazad(id){
   // this.ngOnInit();
   let i;
   for(i=0;i<this.users.length;i++)
    if (this.users[i]._id==id) break;
   this.userService.getUser(this.users[i]._id).subscribe((user:User)=>{
    this.users[i]=user;
    this.izmeni.set(id,false);
   })
  
  }
  sacuvaj(id){
    this.izmeni.set(id,false);
    if (!this.proveri(id)){
       alert(this.editMessage);
       this.izmeni.set(id,true);
    } else{

    }
    
  }
  proveri(id):boolean{
    this.editMessage="";
    let i;
    for( i=0;i<this.users.length;i++)
      if (this.users[i]._id==id) break;
    let user=this.users[i];
    //da li je neko polje prazno
    if (user.username=="" || user.password=="" || user.firstname==""
    || user.lastname=="" || user.address=="" || user.phone=="" || user.email==""
    || user.type=="") this.editMessage+="Popunite sva polja!\n";
    // pocetna slova velika imena i prezimena
    let velikoSlovo=new RegExp("[A-Z][a-z]+");
    if (!(velikoSlovo.test(user.firstname) && velikoSlovo.test(user.lastname)))
      this.editMessage+="Prvo slovo imena i prezime mora biti veliko!\n";
    // format mejla
    let email=new RegExp("^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
    if (!email.test(user.email)) this.editMessage+="Los format emaila. Primer: example@gmail.com\n";
    if (this.editMessage!="") return false; else return true;

  }
}
