import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Borrowing = new Schema({
    _id: {
        type: ObjectId
    },
    username: {
        type: String
    },
    title: {
        type:String
    },
   date:{
        type:String
    },
    returned:{
        type:String
    },
    bookID:{
        type:ObjectId
    },
    author:{
        type:Array
    },
    prolonged:{
        type:Boolean
    }
})

export default mongoose.model("BorrowingrModel", Borrowing, 'borrowings')