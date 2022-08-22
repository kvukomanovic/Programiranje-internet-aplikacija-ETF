"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const mongodb_1 = require("mongodb");
const book_1 = __importDefault(require("../models/book"));
const borrowing_1 = __importDefault(require("../models/borrowing"));
const bookrequest_1 = __importDefault(require("../models/bookrequest"));
const reservation_1 = __importDefault(require("../models/reservation"));
const user_1 = __importDefault(require("../models/user"));
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
        this.search2 = (req, res) => {
            let minyear = req.body.minyear;
            let maxyear = req.body.maxyear;
            let genres = req.body.genres;
            book_1.default.find({ 'title': new RegExp(req.body.title), 'author': new RegExp(req.body.author),
                'publisher': new RegExp(req.body.publisher), 'year': { $gt: minyear, $lt: maxyear + 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    if (genres.length != 0) {
                        let send = [];
                        resp.forEach(b => {
                            let book = new book_1.default(b);
                            let i = false;
                            book.genre.forEach(g => {
                                if (genres.includes(g, 0))
                                    i = true;
                            });
                            if (i)
                                send.push(b);
                        });
                        res.json(send);
                    }
                    else
                        res.json(resp);
                }
            });
        };
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
            let author = book.author;
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
                        bookID: new mongodb_1.ObjectId(book._id),
                        author: author,
                        prolonged: false
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
        /*----------------------------------------------------- */
        this.addBook = (req, res) => {
            let newbook = new book_1.default(req.body);
            newbook.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        /*----------------------------------------------------- */
        this.editBook = (req, res) => {
            let book = new book_1.default(req.body);
            book_1.default.replaceOne({ '_id': book._id }, book, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        /*----------------------------------------------------- */
        this.deleteBook = (req, res) => {
            let book = new book_1.default(req.body);
            book_1.default.deleteOne({ '_id': book._id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        /*------------------------------------------------------ */
        this.notReturnedBorrowingForBook = (req, res) => {
            let _id = req.body._id;
            borrowing_1.default.findOne({ 'bookID': _id, 'returned': null }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*------------------------------------------------------------ */
        this.addBookRequest = (req, res) => {
            let newbook = new bookrequest_1.default(req.body);
            newbook._id = new mongodb_1.ObjectId();
            newbook.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        /*------------------------------------------------------------ */
        this.getAllBookRequests = (req, res) => {
            bookrequest_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*------------------------------------------------------------ */
        this.deleteRequest = (req, res) => {
            bookrequest_1.default.deleteOne({ '_id': req.body._id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    bookrequest_1.default.find({}, (err, resp2) => {
                        if (err)
                            console.log(err);
                        else
                            res.json(resp2);
                    });
            });
        };
        /*---------------------------------------------------------- */
        this.prolong = (req, res) => {
            let _id = req.body._id;
            let date = new Date().toISOString().slice(0, 10);
            borrowing_1.default.updateOne({ '_id': _id }, { $set: { 'prolonged': true, 'date': date } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        /*---------------------------------------------------------- */
        this.reserve = (req, res) => {
            let bookID = req.body.bookID;
            let userID = req.body.userID;
            let reservation = new reservation_1.default();
            reservation.bookID = bookID;
            reservation.userID = userID;
            reservation._id = new mongodb_1.ObjectId();
            reservation.timestamp = new Date().toISOString();
            reservation.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        /*------------------------------------------------------------ */
        this.getReservationsForUser = (req, res) => {
            let userID = req.body.userID;
            reservation_1.default.find({ 'userID': userID }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*------------------------------------------------------------ */
        this.getReservationsForBook = (req, res) => {
            let bookID = req.body.bookID;
            reservation_1.default.find({ 'bookID': bookID }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*------------------------------------------------------------ */
        this.srediRez = (req, res) => {
            let book = new book_1.default(req.body.book);
            let i = req.body.i;
            reservation_1.default.find({ 'bookID': book._id }).sort({ 'timestamp': 1 }).exec((err1, reservations) => {
                if (err1)
                    console.log(err1);
                else if (reservations != null && reservations.length > i) {
                    user_1.default.findOne({ '_id': reservations[i]['userID'] }, (err2, user2) => {
                        if (err2)
                            console.log(err2);
                        else {
                            borrowing_1.default.find({ 'username': user2['username'] }, (err3, borrowings) => {
                                if (err3)
                                    console.log(err3);
                                else {
                                    user_1.default.findOne({ 'type': 'admin' }, (errA, respA) => {
                                        let rok = respA['deadline'];
                                        let cnt = 0;
                                        let moze = true;
                                        let j;
                                        for (j = 0; j < borrowings.length; j++) {
                                            if (borrowings[j].returned == null) {
                                                cnt++;
                                                if ((new Date().getTime() - new Date(borrowings[j]['date']).getTime()) / (1000 * 60 * 60 * 24) > rok || cnt == 3) {
                                                    moze = false;
                                                    break;
                                                }
                                            }
                                        }
                                        if (moze) { //zaduzi i obrisi rez
                                            let username = user2['username'];
                                            let author = book.author;
                                            book_1.default.updateOne({ '_id': book._id }, { $inc: { 'issued': 1, 'available': -1 } }, (errB, respB) => {
                                                if (errB)
                                                    console.log(errB);
                                                else {
                                                    let borrow = {
                                                        _id: new mongodb_1.ObjectId(),
                                                        username: username,
                                                        title: book.title,
                                                        date: new Date().toISOString().slice(0, 10),
                                                        returned: null,
                                                        bookID: new mongodb_1.ObjectId(book._id),
                                                        author: author,
                                                        prolonged: false
                                                    };
                                                    let b = new borrowing_1.default(borrow);
                                                    b.save((errBr, respBr) => {
                                                        if (errBr)
                                                            console.log(errBr);
                                                        else {
                                                            let s = "Ostvarena vam je rezervacija za knjigu " + borrow.title + ".";
                                                            user_1.default.updateOne({ '_id': reservations[i]['userID'] }, { $push: { 'notifications': s } }, (err5, resp) => {
                                                                if (err5)
                                                                    console.log(err5);
                                                                else {
                                                                    reservation_1.default.deleteOne({ '_id': reservations[i]['_id'] }, (errD, respD) => {
                                                                        if (errD)
                                                                            console.log(errD);
                                                                        else
                                                                            res.json({ 'message': "ok" });
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            if (i < reservations.length)
                                                res.json({ 'message': i + 1 });
                                            else
                                                res.json({ 'message': 'nothing to do' });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                else
                    res.json({ 'message': 'nothing to do' });
            });
        };
        /*------------------------------------------- */
        this.sendNotificationAboutBook = (req, res) => {
            let request = new bookrequest_1.default(req.body.request);
            let username = request.username;
            let s = "Zahtev za dodavanje knjige pod nazivom " + request.title + " je prihvacen.";
            user_1.default.updateOne({ 'username': username }, { $push: { 'notifications': s } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "ok" });
            });
        };
        /*------------------------------------------- */
        this.sendNotificationaAboutReservation = (req, res) => {
            let reservation = new reservation_1.default(req.body);
            let s = "Ostvarena vam je rezervacija za knjigu " + reservation.title + ".";
            user_1.default.updateOne({ '_id': reservation.userID }, { $push: { 'notifications': s } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "ok" });
            });
        };
        /*------------------------------------------- */
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=book.controller.js.map