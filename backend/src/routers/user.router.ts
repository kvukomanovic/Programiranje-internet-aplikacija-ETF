import express from 'express'
import { UsersController } from '../controllers/user.controller';

const usersRouter = express.Router();

usersRouter.route('/login').post(
    (req, res)=>new UsersController().login(req, res)
)
usersRouter.route('/register').post(
    (req, res)=>new UsersController().register(req, res)
)
usersRouter.route('/getRok').get(
    (req, res)=>new UsersController().getRok(req, res)
)
usersRouter.route('/getAllUsers').get(
    (req, res)=>new UsersController().getAllUsers(req, res)
)
usersRouter.route('/getUser').post(
    (req, res)=>new UsersController().getUser(req, res)
)
export default usersRouter;