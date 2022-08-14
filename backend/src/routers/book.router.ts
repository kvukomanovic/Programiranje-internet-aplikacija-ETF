import express from 'express'
import { BooksController } from '../controllers/book.controller';

const booksRouter = express.Router();

booksRouter.route('/getAllBooks').get(
    (req, res)=>new BooksController().getAllBooks(req, res)
)
booksRouter.route('/getTopThree').get(
    (req, res)=>new BooksController().getTopThree(req, res)
)
booksRouter.route('/getBook').post(
    (req, res)=>new BooksController().getBook(req, res)
)
booksRouter.route('/search').post(
    (req, res)=>new BooksController().search(req, res)
)

booksRouter.route('/borrowings').post(
    (req, res)=>new BooksController().borrowings(req, res)
)
booksRouter.route('/zaduzi').post(
    (req, res)=>new BooksController().zaduzi(req, res)
)
booksRouter.route('/addComment').post(
    (req, res)=>new BooksController().addComment(req, res)
)
booksRouter.route('/razduzi').post(
    (req, res)=>new BooksController().razduzi(req, res)
)
booksRouter.route('/addBook').post(
    (req, res)=>new BooksController().addBook(req, res)
)
booksRouter.route('/editBook').post(
    (req, res)=>new BooksController().editBook(req, res)
)
booksRouter.route('/deleteBook').post(
    (req, res)=>new BooksController().deleteBook(req, res)
)
booksRouter.route('/notReturnedBorrowingForBook').post(
    (req, res)=>new BooksController().notReturnedBorrowingForBook(req, res)
)

export default booksRouter;