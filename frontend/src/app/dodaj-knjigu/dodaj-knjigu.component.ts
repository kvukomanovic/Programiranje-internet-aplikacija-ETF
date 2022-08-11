import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-dodaj-knjigu',
  templateUrl: './dodaj-knjigu.component.html',
  styleUrls: ['./dodaj-knjigu.component.css']
})
export class DodajKnjiguComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  title:string;
  author:String[]=new Array;
  genre:String[]=new Array;
  publisher:string;
  year:string;
  language:string;
  picture:File;
  image_data;
  image;
  submit(){
   
  }
  change(event){
    let input = event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        //console.log('Hello!')
        //BASE64 Slike!!!
       // console.log(reader.result)
        this.image_data = reader.result;
        this.image = reader.result;
      }

      reader.readAsDataURL(input.files[0]);
    }
  }
}
