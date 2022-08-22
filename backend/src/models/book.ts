import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

let Book = new Schema({
  /*  _id: {
        type: ObjectId
    },*/
    title: {
        type: String
    },
    author: {
        type: Array
        //type: [{text: String}]
    },
    genre:{
        type:Array
    },
    publisher:{
        type:String
    },
    year:{
        type:String
    },
    language:{
        type:String
    },
    pic:{
        type:String
    },
    available:{
        type:Number
    }
    ,
    issued:{
        type:Number
    },
    comments:{
        type:[{
            _id:{
                type:String
            },
            username:{
                type:String
            },
            rating:{
                type:Number
            },
            comment:{
                type:String
            },
            timestamp:{
                type:String
            },
            edited:{
                type:Boolean
            }
        }]
    }
})

export default mongoose.model("BookModel", Book, 'books')