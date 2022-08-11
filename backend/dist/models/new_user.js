"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let New_User = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    picture: {
        type: Number
    },
    type: {
        type: String
    }
});
exports.default = mongoose_1.default.model("NewUserModel", New_User, 'new_user');
//# sourceMappingURL=new_user.js.map