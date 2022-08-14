import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri="http://localhost:4000"
  constructor(private http:HttpClient) { }
  proveri(username,password){
    let data={
      username:username,
      password:password
    }
    return this.http.post(`${this.uri}/users/login`,data)
  }
  register(usernameR,passwordR,firstnameR,lastnameR,emailR,phoneR,addressR,image_data){
    let data={
      username:usernameR,
      password:passwordR,
      firstname:firstnameR,
      lastname:lastnameR,
      email:emailR,
      phone:phoneR,
      address:addressR,
      picture:image_data,
      type:"citalac"
    }
    return this.http.post(`${this.uri}/users/register`,data)
  }
  getRok(){
    return this.http.get(`${this.uri}/users/getRok`)
  }
  /*---------------------------------------------------- */
  getAllUsers(){
    return this.http.get(`${this.uri}/users/getAllUsers`)
  }
  getUser(id){
    let data={
      _id:id
    }
    return this.http.post(`${this.uri}/users/getUser`,data)
  }
}
