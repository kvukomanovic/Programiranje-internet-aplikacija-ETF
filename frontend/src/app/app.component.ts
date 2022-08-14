import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmmiterService } from './event-emmiter.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  constructor(private router:Router,private eventEmmiter:EventEmmiterService){}
  ngOnInit(): void {
    this.listen();
    this.user=JSON.parse(localStorage.getItem("user"));    
  }
  listen(){
    this.eventEmmiter.dataStr.subscribe(data => this.ngOnInit());
  }
  ngOnChanges(){
    this.user=JSON.parse(localStorage.getItem("user"));
  }
  pocetna(){
    if (this.user) this.router.navigate(['pocetnaKorisnik']);
    else this.router.navigate(['']);
  }
  title = 'frontend';
  user:User;
  logout(){
    localStorage.clear();
    this.ngOnInit();
  }
}
