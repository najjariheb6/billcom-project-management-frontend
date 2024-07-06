export class ChatMessageDto{
    idTeam : number;
    idUser : number;
    user:string;
    message : string;
    createdAt:string;

    constructor(idTeam : number,idUser : number, user:string,message:string){
        this.idTeam = idTeam
        this.idUser = idUser
        this.user = user;
        this.message = message;
    }
}