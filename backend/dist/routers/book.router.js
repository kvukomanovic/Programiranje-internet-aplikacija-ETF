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
booksRouter.route('/borrowings').post((req, res) => new book_controller_1.BooksController().borrowings(req, res));
booksRouter.route('/zaduzi').post((req, res) => new book_controller_1.BooksController().zaduzi(req, res));
booksRouter.route('/addComment').post((req, res) => new book_controller_1.BooksController().addComment(req, res));
booksRouter.route('/razduzi').post((req, res) => new book_controller_1.BooksController().razduzi(req, res));
booksRouter.route('/addBook').post((req, res) => new book_controller_1.BooksController().addBook(req, res));
booksRouter.route('/editBook').post((req, res) => new book_controller_1.BooksController().editBook(req, res));
booksRouter.route('/deleteBook').post((req, res) => new book_controller_1.BooksController().deleteBook(req, res));
booksRouter.route('/notReturnedBorrowingForBook').post((req, res) => new book_controller_1.BooksController().notReturnedBorrowingForBook(req, res));
exports.default = booksRouter;
//# sourceMappingURL=book.router.js.map