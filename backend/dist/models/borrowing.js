"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Borrowing = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    username: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    returned: {
        type: String
    },
    bookID: {
        type: mongodb_1.ObjectId
    },
    author: {
        type: Array
    }
});
exports.default = mongoose_1.default.model("BorrowingrModel", Borrowing, 'borrowings');
//# sourceMappingURL=borrowing.js.map