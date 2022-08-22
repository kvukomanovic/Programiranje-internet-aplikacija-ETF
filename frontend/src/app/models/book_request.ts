import { Comment } from "./comment";

export class BookRequest{
    _id:string;
    title:string;
    author:Array<string>;
    genre:Array<string>;
    publisher:string;
    year:string;
    language:string;
    pic:Buffer;
    available:number;
    issued:number;
    comments:Array<Comment>;
    username:string;
}