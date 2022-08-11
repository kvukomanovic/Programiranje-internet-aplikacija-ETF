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
  register(data){
    return this.http.post(`${this.uri}/users/register`,data)
  }
  getRok(){
    return this.http.get(`${this.uri}/users/getRok`)
  }
}
