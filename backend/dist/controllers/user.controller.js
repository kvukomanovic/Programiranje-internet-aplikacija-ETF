"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = __importDefault(require("../models/user"));
const new_user_1 = __importDefault(require("../models/new_user"));
class UsersController {
    constructor() {
        this.login = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            user_1.default.findOne({ 'username': req.body.username }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp != null)
                    res.json({ "message": "Username already taken! Please choose another." });
                /*username ok*/ else
                    user_1.default.findOne({ 'email': req.body.email }, (err2, resp2) => {
                        if (err2)
                            console.log(err2);
                        else if (resp2 != null)
                            res.json({ "message": "Email already taken! Please choose another." });
                        /*email ok */ else {
                            let user = new new_user_1.default(req.body);
                            user.save((err3, resp3) => {
                                if (err3) {
                                    console.log(err3);
                                    res.json({ "message": "error in saving" });
                                }
                                else
                                    res.json({ "message": "ok" });
                            });
                        }
                    });
            });
        };
        this.getRok = (req, res) => {
            user_1.default.findOne({ 'type': "admin" }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map