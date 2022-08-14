import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmmiterService } from '../event-emmiter.service';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,private userService:UserService,private eventEmmiter:EventEmmiterService) { }

  user:User;
  username:string;
  password:string;
  message:string;
  ngOnInit(): void {
    let user:User=JSON.parse(localStorage.getItem("user"));
    if (user) this.router.navigate(['pocetnaKorisnik']);
  }
  login(){
    this.userService.proveri(this.username,this.password).subscribe((user:User)=>{
      if (user!=null && user.type=="admin"){
        localStorage.setItem("user",JSON.stringify(user));
        this.message="";
        this.eventEmmiter.sendMessage("logged");
        this.router.navigate(['']);
      } else this.message="Pogresni kredencijali! Pokusajte ponovo.";
    })

  }
}
