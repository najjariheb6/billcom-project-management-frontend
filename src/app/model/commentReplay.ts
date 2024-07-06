import { Employee } from "./employee";

export interface CommentRepay{
    id? : number;
    contentReplay: string;
    from: Employee;
    to:Employee;
    createdDate: Date
}