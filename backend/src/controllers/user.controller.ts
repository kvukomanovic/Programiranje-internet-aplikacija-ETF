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
            else if (resp!=null) res.json({"message":"Korisnicko ime je zauzeto!"});
/*username ok*/         else  UserModel.findOne({'email':req.body.email},(err2,resp2)=>{
                        if(err2) console.log(err2);
                        else if (resp2!=null) res.json({"message":"Email adresa je zauzeta!"});
 /*email ok */          else {
                                let user= new NewUserModel(req.body);
                                user._id=new ObjectId();
                                user.save((err3,resp3)=>{
                                    if (err3) {
                                        console.log(err3);
                                        res.json({"message":"error in saving"})
                                    }
                                    else res.json({"message":"Uspesno ste poslali zahtev za registraciju. Administrator ce u najkracem roku pregledati vas zahtev."});
                                })
                             }
                    })
        })
    }
    /*---------------------------------------------------- */
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
    /*----------------------------------------------------- */
    editUser=(req: express.Request, res: express.Response)=>{
        let user=new UserModel(req.body);
        UserModel.findOne({'username':user.username, '_id':{$ne : user._id}},(err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({"message":"Korisnicko ime je zauzeto!\n"});
                else  UserModel.findOne({'email':user.email, '_id':{ $ne : user._id}},(err,resp)=>{
                    if (err) console.log(err)
                    else if (resp) res.json({"message":"Email je zauzet!\n"});
                        else  UserModel.replaceOne({'_id':user._id},user,(err,resp)=>{
                            if (err) console.log(err)
                            else res.json({"message":"ok"});
                        })
                })
        })
    }
    /* -------------------------------------------------------*/
    
    addUser=(req: express.Request, res: express.Response)=>{
        let user=new UserModel(req.body);
        user._id=new ObjectId();
        UserModel.findOne({'username':user.username},(err,resp)=>{
            if (err) console.log(err)
            else if (resp) res.json({"message":"Korisnicko ime je zauzeto!\n"});
                else  UserModel.findOne({'email':user.email},(err,resp)=>{
                    if (err) console.log(err)
                    else if (resp) res.json({"message":"Email je zauzet!\n"});
                        else  {
                            user.save((err,resp)=>{
                                if (err) console.log(err)
                                else res.json({"message":"Korisnik je uspesno dodat"});
                            })
                        }
                })
        })
    }
    /*---------------------------------------------------- */
    deleteUser=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        UserModel.deleteOne({'username':username},(err,resp)=>{
            if (err) console.log(err)
            else res.json({"message":"ok"});
        })
    }
    /*----------------------------------------------------- */
    getRequests=(req: express.Request, res: express.Response)=>{
        NewUserModel.find({},(err,resp)=>{
            if (err) console.log(err)
            else res.json(resp);
        })
    }
    /*------------------------------------------------------- */
    denyRequest=(req: express.Request, res: express.Response)=>{
        let _id=req.body._id;
        NewUserModel.deleteOne({'_id':_id},(err,resp)=>{
            if (err) console.log(err)
            else res.json({"message":"ok"});
        })
    }
}