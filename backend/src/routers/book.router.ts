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
booksRouter.route('/search2').post(
    (req, res)=>new BooksController().search2(req, res)
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
booksRouter.route('/addBookRequest').post(
    (req, res)=>new BooksController().addBookRequest(req, res)
)
booksRouter.route('/getAllBookRequests').get(
    (req, res)=>new BooksController().getAllBookRequests(req, res)
)
booksRouter.route('/deleteRequest').post(
    (req, res)=>new BooksController().deleteRequest(req, res)
)
booksRouter.route('/prolong').post(
    (req, res)=>new BooksController().prolong(req, res)
)
booksRouter.route('/reserve').post(
    (req, res)=>new BooksController().reserve(req, res)
)
booksRouter.route('/getReservationsForUser').post(
    (req, res)=>new BooksController().getReservationsForUser(req, res)
)
booksRouter.route('/getReservationsForBook').post(
    (req, res)=>new BooksController().getReservationsForBook(req, res)
)
/*booksRouter.route('/zaduziRezervaciju').post(
    (req, res)=>new BooksController().zaduziRezervaciju(req, res)
)*/
booksRouter.route('/srediRez').post(
    (req, res)=>new BooksController().srediRez(req, res)
)
booksRouter.route('/sendNotificationAboutBook').post(
    (req, res)=>new BooksController().sendNotificationAboutBook(req, res)
)
booksRouter.route('/sendNotificationaAboutReservation').post(
    (req, res)=>new BooksController().sendNotificationaAboutReservation(req, res)
)

export default booksRouter;