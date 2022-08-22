"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Reservation = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    bookID: {
        type: mongodb_1.ObjectId
    },
    userID: {
        type: mongodb_1.ObjectId
    },
    timestamp: {
        type: String
    }
});
exports.default = mongoose_1.default.model("ReservationModel", Reservation, 'reservation');
//# sourceMappingURL=reservation.js.map