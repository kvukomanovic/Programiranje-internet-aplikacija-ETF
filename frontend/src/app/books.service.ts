import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { Borrowing } from './models/borrowing';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  uri='http://localhost:4000';
  constructor(private http:HttpClient) { }

  getAllBooks(){
    return this.http.get(`${this.uri}/books/getAllBooks`)
  }
  getTopThree(){
    return this.http.get(`${this.uri}/books/getTopThree`)
  }
  getBook(_id:string){
    let data={
      _id:_id
    }
    return this.http.post(`${this.uri}/books/getBook`,data)
  }
  search(title,author){
    let data={
      title:title,
      author:author
    }
    return this.http.post(`${this.uri}/books/search`,data)
  }
  getRentedForUser(username){
    let data={
      username:username
    }
    return this.http.post(`${this.uri}/books/getRentedForUser`,data)
  }

  borrowings(username){
    let data={
      username:username
    }
    return this.http.post(`${this.uri}/books/borrowings`,data)
  }
  zaduzi(username:string,book:Book){
    let data={
      username:username,
      book:book
    }
    return this.http.post(`${this.uri}/books/zaduzi`,data)
  }
  /*----------------------------------------------------------- */
  addComment(username:string,book_id:string,rating:number,comment:string){
    let data={
      username:username,
      bookID:book_id,
      rating:rating,
      comment:comment
    }
    return this.http.post(`${this.uri}/books/addComment`,data)
  }
  /*------------------------------------------------------------- */
  razduzi(borrow:Borrowing){
    let data={
      _id:borrow._id,
      bookID:borrow.bookID
    }
    return this.http.post(`${this.uri}/books/razduzi`,data)
  }
  /*------------------------------------------------------------- */
  addBook(title,author,genre,publisher,year,language,pic,available){
    let g=[];
      let a=[];
      genre.forEach(genre=>{
        if (genre!=null || genre!="")
        g.push(genre);
      })
      author.forEach(author=>{
        if (author!=null || author!="")
        a.push(author);
      })
    let data={
      title:title,
      author:a,
      genre:g,
      publisher:publisher,
      year:year,
      language:language,
      pic:pic,
      available:available,
      issued:0,
      comments:[]
    }
    return this.http.post(`${this.uri}/books/addBook`,data)
    
  }
   /*------------------------------------------------------------- */
   editBook(book:Book){
    let a=[];
      for(let i=0;i<book.author.length;i++){
        if (book.author[i]!="") a.push(book.author[i])
      }
      let g=[];
      for(let i=0;i<book.genre.length;i++){
        if (book.genre[i]!="") g.push(book.genre[i])
      }
      book.author=a;
      book.genre=g;
      return this.http.post(`${this.uri}/books/editBook`,book)
   }
   /*------------------------------------------------------------ */
   deleteBook(book:Book){
    return this.http.post(`${this.uri}/books/deleteBook`,book)
   }
   /*------------------------------------------------------------ */
   notReturnedBorrowingForBook(id){
    let data={
      _id:id
    }
    return this.http.post(`${this.uri}/books/notReturnedBorrowingForBook`,data)
   }
}
