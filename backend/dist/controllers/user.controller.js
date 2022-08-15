"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_1 = __importDefault(require("../models/user"));
const new_user_1 = __importDefault(require("../models/new_user"));
const mongodb_1 = require("mongodb");
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
                    res.json({ "message": "Korisnicko ime je zauzeto!" });
                /*username ok*/ else
                    user_1.default.findOne({ 'email': req.body.email }, (err2, resp2) => {
                        if (err2)
                            console.log(err2);
                        else if (resp2 != null)
                            res.json({ "message": "Email adresa je zauzeta!" });
                        /*email ok */ else {
                            let user = new new_user_1.default(req.body);
                            user._id = new mongodb_1.ObjectId();
                            user.save((err3, resp3) => {
                                if (err3) {
                                    console.log(err3);
                                    res.json({ "message": "error in saving" });
                                }
                                else
                                    res.json({ "message": "Uspesno ste poslali zahtev za registraciju. Administrator ce u najkracem roku pregledati vas zahtev." });
                            });
                        }
                    });
            });
        };
        /*---------------------------------------------------- */
        this.getRok = (req, res) => {
            user_1.default.findOne({ 'type': "admin" }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*-------------------------------------------------- */
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        this.getUser = (req, res) => {
            let _id = req.body._id;
            user_1.default.findOne({ '_id': _id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*----------------------------------------------------- */
        this.editUser = (req, res) => {
            let user = new user_1.default(req.body);
            user_1.default.findOne({ 'username': user.username, '_id': { $ne: user._id } }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp)
                    res.json({ "message": "Korisnicko ime je zauzeto!\n" });
                else
                    user_1.default.findOne({ 'email': user.email, '_id': { $ne: user._id } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else if (resp)
                            res.json({ "message": "Email je zauzet!\n" });
                        else
                            user_1.default.replaceOne({ '_id': user._id }, user, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.json({ "message": "ok" });
                            });
                    });
            });
        };
        /* -------------------------------------------------------*/
        this.addUser = (req, res) => {
            let user = new user_1.default(req.body);
            user._id = new mongodb_1.ObjectId();
            user_1.default.findOne({ 'username': user.username }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp)
                    res.json({ "message": "Korisnicko ime je zauzeto!\n" });
                else
                    user_1.default.findOne({ 'email': user.email }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else if (resp)
                            res.json({ "message": "Email je zauzet!\n" });
                        else {
                            user.save((err, resp) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.json({ "message": "Korisnik je uspesno dodat" });
                            });
                        }
                    });
            });
        };
        /*---------------------------------------------------- */
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        /*----------------------------------------------------- */
        this.getRequests = (req, res) => {
            new_user_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json(resp);
            });
        };
        /*------------------------------------------------------- */
        this.denyRequest = (req, res) => {
            let _id = req.body._id;
            new_user_1.default.deleteOne({ '_id': _id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map