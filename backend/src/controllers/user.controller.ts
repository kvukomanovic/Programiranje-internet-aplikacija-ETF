import express from 'express'
import UserModel from '../models/user'
import NewUserModel from '../models/new_user'
import { ObjectId } from 'mongodb'

export class UsersController{
    login = (req: express.Request, res: express.Response)=>{
       UserModel.findOne({'username':req.body.username,'password':req.body.password}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user);                
        })
    }

    register=(req: express.Request, res: express.Response)=>{
        UserModel.findOne({'username':req.body.username},(err,resp)=>{
            if(err) console.log(err);
            else if (resp!=null) res.json({"message":"Username already taken! Please choose another."});
/*username ok*/         else  UserModel.findOne({'email':req.body.email},(err2,resp2)=>{
                        if(err2) console.log(err2);
                        else if (resp2!=null) res.json({"message":"Email already taken! Please choose another."});
 /*email ok */          else {
                                let user= new UserModel(req.body);
                                user._id=new ObjectId();
                                user.save((err3,resp3)=>{
                                    if (err3) {
                                        console.log(err3);
                                        res.json({"message":"error in saving"})
                                    }
                                    else res.json({"message":"ok"});
                                })
                             }
                    })
        })
    }

    getRok=(req: express.Request, res: express.Response)=>{
        UserModel.findOne({'type':"admin"},(err,resp)=>{
            if (err) console.log(err);
            else res.json(resp);
        })

    }
    /*-------------------------------------------------- */
    getAllUsers=(req: express.Request, res: express.Response)=>{
        UserModel.find({},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })
    }
    getUser=(req: express.Request, res: express.Response)=>{
        let _id=req.body._id;
        UserModel.findOne({'_id':_id},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })
    }
}