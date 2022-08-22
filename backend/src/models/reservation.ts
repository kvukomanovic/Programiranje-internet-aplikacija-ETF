import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Reservation = new Schema({
    _id: {
        type: ObjectId
    },
    bookID: {
        type: ObjectId
    },
    userID: {
        type:ObjectId
    },
    timestamp:{
        type:String
    }
})

export default mongoose.model("ReservationModel", Reservation, 'reservation')