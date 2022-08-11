"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const mongodb_1 = require("mongodb");
const book_1 = __importDefault(require("../models/book"));
const borrowing_1 = __importDefault(require("../models/borrowing"));
class BooksController {
    constructor() {
        /*--------------------------------------------------------------- */
        this.getAllBooks = (req, res) => {
            book_1.default.find({}, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        /*--------------------------------------------------------------- */
        this.getTopThree = (req, res) => {
            book_1.default.find({}).sort({ "issued": -1 }).limit(3).exec((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /**------------------------------------------------------------ */
        this.getBook = (req, res) => {
            let _id = req.body._id;
            book_1.default.findOne({ '_id': _id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*--------------------------------------------------------------- */
        this.search = (req, res) => {
            book_1.default.find({ 'title': new RegExp(req.body.title), 'author': new RegExp(req.body.author) }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
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
        this.borrowings = (req, res) => {
            let username = req.body.username;
            borrowing_1.default.find({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*--------------------------------------------------------------- */
        this.zaduzi = (req, res) => {
            let username = req.body.username;
            let book = new book_1.default(req.body.book);
            book_1.default.updateOne({ '_id': book._id }, { $inc: { 'issued': 1, 'available': -1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let borrow = {
                        _id: new mongodb_1.ObjectId(),
                        username: username,
                        title: book.title,
                        date: new Date().toISOString().slice(0, 10),
                        returned: null,
                        bookID: new mongodb_1.ObjectId(book._id)
                    };
                    let b = new borrowing_1.default(borrow);
                    b.save((err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ "message": "ok" });
                    });
                }
            });
        };
        /*---------------------------------------------------------------- */
        this.addComment = (req, res) => {
            let username = req.body.username;
            let bookID = req.body.bookID;
            let rating = req.body.rating;
            let comment = req.body.comment;
            book_1.default.updateOne({ '_id': bookID }, { $push: { 'comments': {
                        // '_id':new ObjectId(),
                        'username': username,
                        'bookID': bookID,
                        'rating': rating,
                        'comment': comment,
                        'timestamp': new Date().toISOString()
                    } } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        /*----------------------------------------------------- */
        this.razduzi = (req, res) => {
            let _id = req.body._id;
            let bookID = req.body.bookID;
            book_1.default.updateOne({ '_id': bookID }, { $inc: { 'available': 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    borrowing_1.default.updateOne({ '_id': _id }, { $set: { 'returned': new Date().toISOString().slice(0, 10) } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': "ok" });
                    });
                }
            });
        };
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=book.controller.js.map