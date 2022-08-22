"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const booksRouter = express_1.default.Router();
booksRouter.route('/getAllBooks').get((req, res) => new book_controller_1.BooksController().getAllBooks(req, res));
booksRouter.route('/getTopThree').get((req, res) => new book_controller_1.BooksController().getTopThree(req, res));
booksRouter.route('/getBook').post((req, res) => new book_controller_1.BooksController().getBook(req, res));
booksRouter.route('/search').post((req, res) => new book_controller_1.BooksController().search(req, res));
booksRouter.route('/search2').post((req, res) => new book_controller_1.BooksController().search2(req, res));
booksRouter.route('/borrowings').post((req, res) => new book_controller_1.BooksController().borrowings(req, res));
booksRouter.route('/zaduzi').post((req, res) => new book_controller_1.BooksController().zaduzi(req, res));
booksRouter.route('/addComment').post((req, res) => new book_controller_1.BooksController().addComment(req, res));
booksRouter.route('/razduzi').post((req, res) => new book_controller_1.BooksController().razduzi(req, res));
booksRouter.route('/addBook').post((req, res) => new book_controller_1.BooksController().addBook(req, res));
booksRouter.route('/editBook').post((req, res) => new book_controller_1.BooksController().editBook(req, res));
booksRouter.route('/deleteBook').post((req, res) => new book_controller_1.BooksController().deleteBook(req, res));
booksRouter.route('/notReturnedBorrowingForBook').post((req, res) => new book_controller_1.BooksController().notReturnedBorrowingForBook(req, res));
booksRouter.route('/addBookRequest').post((req, res) => new book_controller_1.BooksController().addBookRequest(req, res));
booksRouter.route('/getAllBookRequests').get((req, res) => new book_controller_1.BooksController().getAllBookRequests(req, res));
booksRouter.route('/deleteRequest').post((req, res) => new book_controller_1.BooksController().deleteRequest(req, res));
booksRouter.route('/prolong').post((req, res) => new book_controller_1.BooksController().prolong(req, res));
booksRouter.route('/reserve').post((req, res) => new book_controller_1.BooksController().reserve(req, res));
booksRouter.route('/getReservationsForUser').post((req, res) => new book_controller_1.BooksController().getReservationsForUser(req, res));
booksRouter.route('/getReservationsForBook').post((req, res) => new book_controller_1.BooksController().getReservationsForBook(req, res));
/*booksRouter.route('/zaduziRezervaciju').post(
    (req, res)=>new BooksController().zaduziRezervaciju(req, res)
)*/
booksRouter.route('/srediRez').post((req, res) => new book_controller_1.BooksController().srediRez(req, res));
booksRouter.route('/sendNotificationAboutBook').post((req, res) => new book_controller_1.BooksController().sendNotificationAboutBook(req, res));
booksRouter.route('/sendNotificationaAboutReservation').post((req, res) => new book_controller_1.BooksController().sendNotificationaAboutReservation(req, res));
exports.default = booksRouter;
//# sourceMappingURL=book.router.js.map