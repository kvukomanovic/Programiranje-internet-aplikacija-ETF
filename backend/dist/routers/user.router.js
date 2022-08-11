"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const usersRouter = express_1.default.Router();
usersRouter.route('/login').post((req, res) => new user_controller_1.UsersController().login(req, res));
usersRouter.route('/register').post((req, res) => new user_controller_1.UsersController().register(req, res));
usersRouter.route('/getRok').get((req, res) => new user_controller_1.UsersController().getRok(req, res));
exports.default = usersRouter;
//# sourceMappingURL=user.router.js.map