import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

let BookRequest = new Schema({
   _id: {
        type: ObjectId
    },
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
            }
        }]
    },
    username:{
        type:String
    }
})

export default mongoose.model("BookRequestModel", BookRequest, 'book_request')