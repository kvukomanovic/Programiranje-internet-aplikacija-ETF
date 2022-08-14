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
  }

  username:string;
  password:string;
  type:string;
  message:string;

  usernameR:string;
  passwordR:string;
  password2R:string;
  firstnameR:string;
  lastnameR:string;
  addressR:string;
  phoneR:string;
  emailR:string;
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
    if (this.password2R!=this.passwordR) this.messageR="Pogresno uneta lozinka!";
    else{
      this.userService.register(this.usernameR,this.passwordR,this.firstnameR,this.lastnameR,this.emailR,this.phoneR,this.addressR,this.image_data).subscribe((resp)=>{
        if (resp["message"]=="ok") {
          this.messageR="";
          alert("Uspesno ste se registrovali!");
         // this.router.navigate([""]);
        }
        else this.messageR=resp["message"];

        
      })
    }
    
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
}
