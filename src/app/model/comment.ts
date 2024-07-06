import { CommentRepay } from "./commentReplay";
import { Employee } from "./employee";

export class Comment{
    id? : number;
    content : String;
    createdDate : Date;
    user : Employee;
    replay : CommentRepay[]
  isReading: boolean;
  visible: any;
  update: boolean;
    constructor( content:string, user:Employee){

        this.content = content;
        this.user= user;

    }
}