import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import booksRouter from './routers/book.router';
import usersRouter from './routers/user.router';


const app = express();
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json())


mongoose.connect('mongodb://localhost:27017/projekat2022')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/books', booksRouter)
router.use('/users', usersRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));