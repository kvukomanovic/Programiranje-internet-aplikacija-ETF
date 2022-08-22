import { Component, OnInit } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Buffer } from 'buffer';
import { last } from 'rxjs';
import { BooksService } from '../books.service';
import { Borrowing } from '../models/borrowing';
import { NewUser } from '../models/new_user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-svi-korisnici',
  templateUrl: './svi-korisnici.component.html',
  styleUrls: ['./svi-korisnici.component.css']
})
export class SviKorisniciComponent implements OnInit {

  constructor(private userService:UserService,private booksService:BooksService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if (this.user==null) this.router.navigate(['']);
    else if (this.user.type!="admin") {
       this.router.navigate(['pocetnaKorisnik']);
    }
    this.userService.getAllUsers().subscribe((users:User[])=>{
      if ((this.users=users)!=null){
        this.users.forEach((user)=>{
          this.izmeni.set(user._id,false);
        })
        this.ready=true;
      }
    })
    this.userService.getRequests().subscribe((newuser:NewUser[])=>{
      if (newuser) this.zahtevi=newuser;
    })
  }
  user:User;
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
  image;
  image_data:any;
  izmeni:Map<String,boolean>=new Map();
  zahtevi:NewUser[];

  izmeniF(id){
    this.izmeni.set(id,true);
  }
  obrisi(id){
    let i;
    for(i=0;i<this.users.length;i++)
       if (this.users[i]._id==id) break;
    this.booksService.borrowings(this.users[i].username).subscribe((borrowins:Borrowing[])=>{
      let ok=true;
      if (borrowins!=null){
        borrowins.forEach(borrow=>{
            if (borrow.returned==null) ok=false;
        })
      }
      if (!ok) alert("Ne mozete obrisati korisnika trenutno. Korisnik nije vratio sve knjige!");
      else this.userService.deleteUser(this.users[i].username).subscribe((resp)=>{
        if (resp["message"]!="ok") alert("Neuspesno brisanje korisnika");
        else alert("Uspesno ste obrisali korisnika");
        this.ngOnInit();
      })

    })
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
  //  this.izmeni.set(id,false);
    if (!this.proveri(id)){
       alert(this.editMessage);
       this.izmeni.set(id,true);
    } else{
      let i;
      for( i=0;i<this.users.length;i++)
        if (this.users[i]._id==id) break;
      this.userService.editUser(this.users[i]).subscribe((resp)=>{
        if (resp['message']=="ok") 
          this.userService.getUser(this.users[i]._id).subscribe((user:User)=>{
            if (user) this.users[i]=user;
            this.izmeni.set(id,false)
          })
          else{
             alert(resp['message']);
             this.izmeni.set(id,true);
          }
      })
    }
    
  }
  /*------------------------------------------------------- */
  dodajKorisnika(){
    if (!this.proveri(-1)) alert(this.editMessage);
    else {
      if (this.image_data==null) this.image_data="/assets/user.jpg";
      this.userService.addUser(this.usernameFromForm,this.passwordFromForm,this.firstnameFromForm,this.lastnameFromForm,
        this.emailFromForm,this.phoneFromForm,this.addressFromForm,this.typeFromForm,this.image_data).subscribe((resp)=>{
          alert(resp['message']);
          window.location.reload();
      })
       
    }

  }
  /*--------------------------------------------------------*/
  proveri(id):boolean{
    this.editMessage="";
    let user:User;
    if (id==-1){ user=new User();
      user.username=this.usernameFromForm;user.password=this.passwordFromForm;
      user.firstname=this.firstnameFromForm;user.lastname=this.lastnameFromForm;
      user.address=this.addressFromForm; user.phone=this.phoneFromForm;
      user.email=this.emailFromForm; user.type=this.typeFromForm;
    } else{
      let i;
      for( i=0;i<this.users.length;i++)
        if (this.users[i]._id==id) break;
      user=this.users[i];
    }
    //da li je neko polje prazno
    if (user.username=="" || user.password=="" || user.firstname==""
    || user.lastname=="" || user.address=="" || user.phone=="" || user.email==""
    || user.type=="") this.editMessage+="Popunite sva polja!\n";
    // pocetna slova velika imena i prezimena
    let velikoSlovo=new RegExp("^[A-Z][a-z]+$");
    if (!(velikoSlovo.test(user.firstname) && velikoSlovo.test(user.lastname)))
      this.editMessage+="Prvo slovo imena i prezime mora biti veliko!\n";
    //format lozinke
    let pass=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z][a-zA-z0-9!@#$%^&]{7,11}$/;
    if (!pass.test(user.password)) this.editMessage+="Los format sifre.\n";
    // format mejla
    let email=/^[a-zA-z\d]+@[a-z\d](.[a-z])+$/;
    if (!email.test(user.email)) this.editMessage+="Los format emaila. Primer: example@gmail.com\n";
    if (user._id!=this.user._id){
      if (user.type=="admin") this.editMessage+="Postoji samo jedan admin u sistemu!\n";
      if (user.type!="citalac" && user.type!="moderator") this.editMessage+="Clan moze biti moderator ili citalac\n";
    }
    let phone=/^\+3816\d{7,8}$/;
    if (!phone.test(user.phone)) this.editMessage+="Telefon nije u redu. Primer: +381644502558, +3816xxxxxxx"
    if (user.username.toLowerCase()!=user.username) this.editMessage+="Korisnicko ime ne sme sadrzati velika slova!\n";

    if (this.editMessage!="") return false; else return true;

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
  /*------------------------------------------------------ */
  prihvati(_idzahteva){
    let i;
    for(i=0;i<this.zahtevi.length;i++)
      if (this.zahtevi[i]._id==_idzahteva) break;
    let z=this.zahtevi[i];
    this.userService.addUser(z.username,z.password,z.firstname,z.lastname,z.email,z.phone,z.address,z.type,z.picture).subscribe((resp)=>{
      if (resp['message']=="Korisnik je uspesno dodat"){
        this.userService.denyRequest(_idzahteva).subscribe((resp2)=>{
          if (resp2['message']=="ok"){
            alert("Uspesno prihvacen zahtev");
            this.ngOnInit();
          } 
          else alert(resp2['message']);
        })
      } else alert(resp['message']);
    })

  }
  /*---------------------------------------------------- */
  odbij(_idzahteva){
    this.userService.denyRequest(_idzahteva).subscribe((resp)=>{
      if (resp['message']=="ok"){
        alert("Uspesno obrisan zahtev");
        this.ngOnInit();
      } 
    })
  }
  /*---------------------------------------------------- */
  saveDeadline(){
    this.userService.editUser(this.user).subscribe((resp)=>{
      if (resp['message']=="ok") this.userService.getUser(this.user._id).subscribe((user:User)=>{
        this.user=user;
        localStorage.setItem("user",JSON.stringify(this.user));
        this.ngOnInit();
      })
    })
  }
  /*---------------------------------------------------- */
  block(user:User){
    this.userService.block(user._id).subscribe(()=>{
      this.ngOnInit();
    })
  }
  /*---------------------------------------------------- */
  unblock(user:User){
    this.userService.unblock(user._id).subscribe(()=>{
      this.ngOnInit();
    })
  }
  /*---------------------------------------------------- */
}
