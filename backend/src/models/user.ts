import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    _id: {
        type: ObjectId
    },
    username: {
        type: String
    },
    password: {
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    picture:{
        type:String
    },
    type:{
        type:String
    },
    deadline:{
        type:Number
    },
    blocked:{
        type:Boolean
    },
    notifications:{
        type:Array<String>
    }
})

export default mongoose.model("UserModel", User, 'users')