export interface Notification{
    id? : number;
    message: string;
    subject : string;
    idCreatedBy:number;
    createdAt:string;
    seen:boolean;
    notificationType:string;
}