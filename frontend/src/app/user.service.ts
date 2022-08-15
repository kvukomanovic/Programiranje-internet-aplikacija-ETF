import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

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
  /*-------------------------------------- */
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
  editUser(user:User){
    return this.http.post(`${this.uri}/users/editUser`,user)
  }
  addUser(usernameR,passwordR,firstnameR,lastnameR,emailR,phoneR,addressR,typeR,image_data){
    let data={
      username:usernameR,
      password:passwordR,
      firstname:firstnameR,
      lastname:lastnameR,
      email:emailR,
      phone:phoneR,
      address:addressR,
      picture:image_data,
      type:typeR
    }
    return this.http.post(`${this.uri}/users/addUser`,data)
  }
  /*------------------------------------------------------ */
  deleteUser(username:string){
    let data={username:username}
    return this.http.post(`${this.uri}/users/deleteUser`,data)
  }
  /*--------------------------------------------------- */
  getRequests(){
    return this.http.get(`${this.uri}/users/getRequests`)
  }
  /*--------------------------------------------------- */
  denyRequest(id){
    let data={_id:id}
    return this.http.post(`${this.uri}/users/denyRequest`,data)

  }
}
