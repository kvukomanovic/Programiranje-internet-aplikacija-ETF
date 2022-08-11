import { BADRESP } from 'dns'
import express from 'express'
import { ObjectId } from 'mongodb'
import BookModel from '../models/book'
import BorrowingModel from '../models/borrowing'

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
   /*  getRentedForUser = (req: express.Request, res: express.Response)=>{
        let username=req.body.username;

        BorrowingModel.find({'username':username},(err,resp)=>{
            if (err) console.log(err);
            else res.json(resp);
        })
     }*/
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

        BookModel.updateOne({'_id':book._id},{$inc : {'issued': 1,'available':-1}},(err,resp)=>{
            if (err) console.log(err);
            else {
                let borrow={
                    _id:new ObjectId(),
                    username:username,
                    title:book.title,
                    date:new Date().toISOString().slice(0,10),
                    returned:null,
                    bookID:new ObjectId(book._id)
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
     
}