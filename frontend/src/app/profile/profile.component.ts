import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EventEmitter } from 'stream';
import { BooksService } from '../books.service';
import { EventEmmiterService } from '../event-emmiter.service';
import { Book } from '../models/book';
import { Borrowing } from '../models/borrowing';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService,private eventEmitter:EventEmmiterService,private router:Router,
    private bookService:BooksService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    this.userService.getUser(this.user._id).subscribe((user:User)=>{
      this.user=user;
      this.image=this.user.picture;
      this.bookService.borrowings(this.user.username).subscribe((borrowings:Borrowing[])=>{
        this.borrowings=borrowings;
        if (this.user.type!='admin') this.grafikoni();
      })
    })
    this.image=this.user.picture;
   
  }
  user:User;
  izmeni:boolean=false;
  image_data:any;
  image;
  editMessage:string;
  newpassword;
  newpassword2;


  izmeniF(){
    this.izmeni=true;
  }
  sacuvaj(){
    if (!this.proveri()){
      alert(this.editMessage);
    }
    else this.userService.editUser(this.user).subscribe((resp)=>{
      if (resp['message']=="ok") this.userService.getUser(this.user._id).subscribe((user:User)=>{
        this.user=user;
        localStorage.setItem("user",JSON.stringify(this.user));
        this.izmeni=false;
        this.eventEmitter.sendMessage("");

      })
    })
    
  }
  nazad(){
    this.izmeni=false;
    this.newpassword=null;
    this.newpassword2=null;
    this.userService.getUser(this.user._id).subscribe((user:User)=>{
      this.user=user;
    })
   
  }
  /*--------------------------------------- */
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
  /*----------------------------------- */
  promeniLozinku(){
    let pass=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z][a-zA-z0-9!@#$%^&]{7,11}$/;
    if ((this.newpassword!="" || this.newpassword2!="") && (this.newpassword!=null || this.newpassword2!=null)){
      if (this.newpassword!=this.newpassword2)  alert("Lozinke nisu iste. Pokusajte ponovo\n");
      else if (!pass.test(this.newpassword)){
        alert("Los format lozinke. Lozinka mora pocinjati slovom, sadrzati bar jedno veliko slovo, jedan specijalni karakter(!@#$%^&) i jednu cifru i biti duzine od 8 do 12 cifara.");

      }else{
        this.user.password=this.newpassword;
        this.userService.editUser(this.user).subscribe((resp)=>{
          if (resp['message']=="ok") this.userService.getUser(this.user._id).subscribe((user:User)=>{
            this.odjava();
          })
        })
      }
       
    }  
  }
  /*----------------------------------- */
  odjava(){
    localStorage.clear();
    this.eventEmitter.sendMessage("");
    this.router.navigate(['']);
  }
  /*----------------------------------- */
  proveri():boolean{
    this.editMessage="";
    let user=this.user;
    if (this.image_data!=null) user.picture=this.image_data;
    //da li je neko polje prazno
    if (user.username=="" || user.password=="" || user.firstname==""
    || user.lastname=="" || user.address=="" || user.phone=="" || user.email==""
    || user.type=="") this.editMessage+="Popunite sva polja!\n";
    // pocetna slova velika imena i prezimena
    let velikoSlovo=new RegExp("^[A-Z][a-z]+$");
    if (!(velikoSlovo.test(user.firstname) && velikoSlovo.test(user.lastname)))
      this.editMessage+="Prvo slovo imena i prezime mora biti veliko!\n";
    // format mejla
    let email=/^[a-zA-z\d]+@[a-z\d](.[a-z])+$/;
    if (!email.test(user.email)) this.editMessage+="Los format emaila. Primer: example@gmail.com\n";
    let phone=/^\+3816\d{7,8}$/;
    if (!phone.test(user.phone)) this.editMessage+="Telefon nije u redu. Primer: +381644502558, +3816xxxxxxx"
    if (user.username.toLowerCase()!=user.username) this.editMessage+="Korisnicko ime ne sme sadrzati velika slova!\n";

    if (this.editMessage!="") return false; else return true;

  }


  borrowings:Borrowing[];
  showMeseci:boolean=false;
  showGenre:boolean=false;
  meseci:number[]=[0,0,0,0,0,0,0,0,0,0,0,0];
  genre:Map<string,number>=new Map<string,number>();

  grafikoni(){
    for(let i=0;i<this.borrowings.length;i++){
      if ((new Date().getTime()-new Date(this.borrowings[i].date).getTime())/(1000*60*60*24)<=365){
        let mesec=Number(this.borrowings[i].date.slice(5,7));
        this.meseci[mesec-1]+=1;     
      }

      this.bookService.getAllBooks().subscribe((books:Book[])=>{
        for(let i=0;i<books.length;i++){
          books[i].genre.forEach(genre=>{
            if (!this.genre.has(genre))
              this.genre.set(genre,0);
          })
        }
        this.borrowings.forEach(borrow=>{
          for(let i=0;i<books.length;i++)
          if (books[i]._id==borrow.bookID){
              books[i].genre.forEach(genre=>{
                 this.genre.set(genre,this.genre.get(genre)+1);
              })
            break;
          }
        })
        this.genre.forEach((value,key)=>{
          this.genreChartOptions.data[0].dataPoints.push({y:value, label:key});
        })
        this.showGenre=true;
       
      })

    }
    this.chartOptions.data[0].dataPoints=[
			{ label: "januar", y: this.meseci[0] },
			{ label: "februar", y:  this.meseci[1] },
			{ label: "mart", y:  this.meseci[2] },
			{ label: "april", y:  this.meseci[3] },
			{ label: "maj", y:  this.meseci[4] },
			{ label: "jun", y: this.meseci[5] },
			{ label: "jul", y:  this.meseci[6]},
			{ label: "avgust", y:  this.meseci[7] },
			{ label: "septembar", y:  this.meseci[8] },
			{ label: "oktobar", y:  this.meseci[9] },
      { label: "novembar", y:  this.meseci[10] },
      { label: "decembar", y:  this.meseci[11] }
		]
	  this.showMeseci=true;
    
  }
  chartOptions = {
	  title: {
		  text: "Broj zaduzenja po mesecima"
	  },
	  animationEnabled: true,
	  axisY: {
		includeZero: true
	  },
	  data: [{
		type: "line", //change type to bar, line, area, pie, etc
		//indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
		dataPoints: []
	  }]
	}
  genreChartOptions = {
	  title: {
		  text: "Broj zaduzenja po zanrovima"
	  },
	  animationEnabled: true,
	  axisY: {
		includeZero: true
	  },
	  data: [{
		type: "column", //change type to bar, line, area, pie, etc
		//indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
		dataPoints: []
	  }]
	}
}
