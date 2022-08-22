"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let BookRequest = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    title: {
        type: String
    },
    author: {
        type: Array
        //type: [{text: String}]
    },
    genre: {
        type: Array
    },
    publisher: {
        type: String
    },
    year: {
        type: String
    },
    language: {
        type: String
    },
    pic: {
        type: String
    },
    available: {
        type: Number
    },
    issued: {
        type: Number
    },
    comments: {
        type: [{
                _id: {
                    type: String
                },
                username: {
                    type: String
                },
                rating: {
                    type: Number
                },
                comment: {
                    type: String
                },
                timestamp: {
                    type: String
                }
            }]
    },
    username: {
        type: String
    }
});
exports.default = mongoose_1.default.model("BookRequestModel", BookRequest, 'book_request');
//# sourceMappingURL=bookrequest.js.map