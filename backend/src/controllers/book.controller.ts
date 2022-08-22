import { BADRESP } from 'dns'
import express, { raw } from 'express'
import { ObjectId } from 'mongodb'
import BookModel from '../models/book'
import BorrowingModel from '../models/borrowing'
import BookRequestModel from '../models/bookrequest'
import ReservationModel from '../models/reservation'
import UserModel from '../models/user'


export class BooksController{
    /*--------------------------------------------------------------- */
    getAllBooks = (req: express.Request, res: express.Response)=>{
       BookModel.find({}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    /*--------------------------------------------------------------- */
    getTopThree = (req: express.Request, res: express.Response)=>{
        BookModel.find({}).sort({"issued":-1}).limit(3).exec((err,resp)=>{
            if (err) console.log(err);
            else res.json(resp);
        })
     }
     /**------------------------------------------------------------ */
     getBook= (req: express.Request, res: express.Response)=>{
        let _id=req.body._id;
        BookModel.findOne({'_id':_id},(err,resp)=>{
            if (err) console.log(err);
            else res.json(resp);
        })
    }
     /*--------------------------------------------------------------- */
     search = (req: express.Request, res: express.Response)=>{
        BookModel.find({'title':new RegExp(req.body.title),'author':new RegExp(req.body.author)},(err,resp)=>{
            if (err) console.log(err);
            else res.json(resp);
        })
     }
     /*--------------------------------------------------------------- */
     search2 = (req: express.Request, res: express.Response)=>{
        let minyear=req.body.minyear;
        let maxyear=req.body.maxyear;
        let genres:string[]=req.body.genres;
        BookModel.find({'title':new RegExp(req.body.title),'author':new RegExp(req.body.author),
            'publisher':new RegExp(req.body.publisher), 'year':{ $gt: minyear, $lt : maxyear+1}},(err,resp)=>{
            if (err) console.log(err);
            else{
                if (genres.length!=0){
                    let send=[];
                    resp.forEach(b=>{
                        let book=new BookModel(b); let i=false;
                        book.genre.forEach(g=>{
                            if (genres.includes(g,0)) i=true;
                        })
                        if (i) send.push(b);
                    })
                    res.json(send);
                } else res.json(resp);
            } 
        })
     }
     /*--------------------------------------------------------------- */
   
     
     /*--------------------------------------------------------------- */
     borrowings=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;

        BorrowingModel.find({'username':username},(err,resp)=>{
            if (err) console.log(err);
            else res.json(resp);
        })
     }
     /*--------------------------------------------------------------- */
     zaduzi=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let book=new BookModel(req.body.book);
        let author=book.author;

        BookModel.updateOne({'_id':book._id},{$inc : {'issued': 1,'available':-1}},(err,resp)=>{
            if (err) console.log(err);
            else {
                let borrow={
                    _id:new ObjectId(),
                    username:username,
                    title:book.title,
                    date:new Date().toISOString().slice(0,10),
                    returned:null,
                    bookID:new ObjectId(book._id),
                    author:author,
                    prolonged:false
                }
                let b=new BorrowingModel(borrow);
                b.save((err,resp)=>{
                    if (err) console.log(err)
                    else res.json({"message":"ok"});
                })
            }
        })

    }
    /*---------------------------------------------------------------- */
    addComment=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let bookID=req.body.bookID;
        let rating=req.body.rating;
        let comment=req.body.comment;

        BookModel.updateOne({'_id':bookID},{$push:{'comments':{
           // '_id':new ObjectId(),
            'username':username,
            'bookID':bookID,
            'rating':rating,
            'comment':comment,
            'timestamp':new Date().toISOString()
        }}},(err,resp)=>{
            if (err) console.log(err)
            else res.json({'message':'ok'});
        })
       
    }
    /*----------------------------------------------------- */
    razduzi=(req: express.Request, res: express.Response)=>{
        let _id=req.body._id;
        let bookID=req.body.bookID;
        BookModel.updateOne({'_id':bookID},{$inc: {'available':1}},(err,resp)=>{
            if (err) console.log(err);
            else{
                BorrowingModel.updateOne({'_id':_id},{$set:{'returned':new Date().toISOString().slice(0,10)}},(err,resp)=>{
                    if (err) console.log(err);
                    else res.json({'message':"ok"});
                })
            }
        })
    }
     /*----------------------------------------------------- */
     addBook=(req: express.Request, res: express.Response)=>{
        let newbook=new BookModel(req.body);
        newbook.save((err,resp)=>{
            if (err) console.log(err);
            else res.json({"message":"ok"});
        })        
     }
      /*----------------------------------------------------- */
      editBook=(req: express.Request, res: express.Response)=>{
        let book=new BookModel(req.body);
        BookModel.replaceOne({'_id':book._id},book,(err,resp)=>{
            if (err) console.log(err)
            else res.json({"message":"ok"});
        })
        
      }
      /*----------------------------------------------------- */
      deleteBook=(req: express.Request, res: express.Response)=>{
        let book=new BookModel(req.body);
        BookModel.deleteOne({'_id':book._id},(err,resp)=>{
            if (err) console.log(err)
            else res.json({"message":"ok"});
        })
        
      }
      /*------------------------------------------------------ */
      notReturnedBorrowingForBook=(req: express.Request, res: express.Response)=>{
        let _id=req.body._id;
        BorrowingModel.findOne({'bookID':_id, 'returned':null},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })
      }
      /*------------------------------------------------------------ */
      addBookRequest=(req: express.Request, res: express.Response)=>{
        let newbook=new BookRequestModel(req.body);
        newbook._id=new ObjectId();
        newbook.save((err,resp)=>{
            if (err) console.log(err)
            else res.json({"message":"ok"});
        })        
     }
     /*------------------------------------------------------------ */
     getAllBookRequests=(req: express.Request, res: express.Response)=>{
        BookRequestModel.find({},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })      
     }
      /*------------------------------------------------------------ */
      deleteRequest=(req: express.Request, res: express.Response)=>{
        BookRequestModel.deleteOne({'_id':req.body._id},(err,resp)=>{
            if (err) console.log(err)
            else BookRequestModel.find({},(err,resp2)=>{
                if (err) console.log(err)
                else res.json(resp2);
            })
        })      
     }
     /*---------------------------------------------------------- */
     prolong=(req: express.Request, res: express.Response)=>{
        let _id=req.body._id;
        let date=new Date().toISOString().slice(0,10);
        BorrowingModel.updateOne({'_id':_id},{$set:{'prolonged':true, 'date':date}},(err,resp)=>{
            if (err) console.log(err)
            else res.json({"message":"ok"});
        })
     }
     /*---------------------------------------------------------- */
     reserve=(req: express.Request, res: express.Response)=>{
        let bookID=req.body.bookID;
        let userID=req.body.userID;
        let reservation=new ReservationModel();
        reservation.bookID=bookID;
        reservation.userID=userID;
        reservation._id=new ObjectId();
        reservation.timestamp=new Date().toISOString();

        reservation.save((err,resp)=>{
            if (err) console.log(err)
            else res.json({"message":"ok"});
        })
     }
     /*------------------------------------------------------------ */
     getReservationsForUser=(req: express.Request, res: express.Response)=>{
        let userID=req.body.userID;
        ReservationModel.find({'userID':userID},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })      
     }
     /*------------------------------------------------------------ */
     getReservationsForBook=(req: express.Request, res: express.Response)=>{
        let bookID=req.body.bookID;
        ReservationModel.find({'bookID':bookID},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })      
     }
      /*------------------------------------------------------------ */
    
     srediRez=(req: express.Request, res: express.Response)=>{
        let book=new BookModel(req.body.book);
        let i=req.body.i;
        ReservationModel.find({'bookID':book._id}).sort({'timestamp':1}).exec((err1,reservations)=>{
            if (err1) console.log(err1);
            else if ( reservations!=null && reservations.length > i){
                UserModel.findOne({'_id':reservations[i]['userID']},(err2,user2)=>{
                    if (err2) console.log(err2);
                    else{
                        BorrowingModel.find({'username':user2['username']},(err3,borrowings)=>{
                            if (err3) console.log(err3);
                            else{
                                UserModel.findOne({'type':'admin'},(errA,respA)=>{
                                    let rok=respA['deadline'];
                                    let cnt=0;
                                    let moze=true;let j;
                                    for(j=0;j<borrowings.length;j++){
                                        if (borrowings[j].returned==null){
                                            cnt++;
                                            if (( new Date().getTime() -new Date(borrowings[j]['date']).getTime())/(1000*60*60*24)>rok || cnt==3){
                                                moze=false;
                                                break;
                                            }
                                        }
                                    }
                        
                                    if (moze){//zaduzi i obrisi rez
                                        let username=user2['username'];
                                        let author=book.author;
                                        BookModel.updateOne({'_id':book._id},{$inc : {'issued': 1,'available':-1}},(errB,respB)=>{
                                            if (errB) console.log(errB);
                                            else {
                                                let borrow={
                                                    _id:new ObjectId(),
                                                    username:username,
                                                    title:book.title,
                                                    date:new Date().toISOString().slice(0,10),
                                                    returned:null,
                                                    bookID:new ObjectId(book._id),
                                                    author:author,
                                                    prolonged:false
                                                }
                                                let b=new BorrowingModel(borrow);
                                                b.save((errBr,respBr)=>{
                                                     if (errBr) console.log(errBr)
                                                     else{
                                                        let s="Ostvarena vam je rezervacija za knjigu "+borrow.title+".";
                                                        UserModel.updateOne({'_id':reservations[i]['userID']},{$push:{'notifications':s}},(err5,resp)=>{
                                                         if (err5) console.log(err5);
                                                         else {
                                                            ReservationModel.deleteOne({'_id':reservations[i]['_id']},(errD,respD)=>{
                                                                if (errD) console.log(errD);
                                                                else res.json({'message':"ok"});
                                                            })
                                                         }
                                                          })
                                                        
                                                     }
                                                })
                                            }
                                        })
                                    }else{
                                        if (i<reservations.length) res.json({'message':i+1});
                                        else res.json({'message':'nothing to do'});
                                    }
                                })
                            }
                        })
                    }
                })
            }else res.json({'message':'nothing to do'});

        })
     }
     /*------------------------------------------- */
     sendNotificationAboutBook=(req: express.Request, res: express.Response)=>{
        let request=new BookRequestModel(req.body.request);
        let username=request.username;
        let s="Zahtev za dodavanje knjige pod nazivom "+request.title+" je prihvacen.";
        UserModel.updateOne({'username':username},{$push:{'notifications':s}},(err,resp)=>{
            if (err) console.log(err);
            else res.json({'message':"ok"});
        })
     }
     /*------------------------------------------- */
     sendNotificationaAboutReservation=(req: express.Request, res: express.Response)=>{
        let reservation=new ReservationModel(req.body);
        let s="Ostvarena vam je rezervacija za knjigu "+reservation.title+".";
        UserModel.updateOne({'_id':reservation.userID},{$push:{'notifications':s}},(err,resp)=>{
            if (err) console.log(err);
            else res.json({'message':"ok"});
        })
     }
      /*------------------------------------------- */
    
}