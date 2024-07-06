import { MergeMapSubscriber } from "rxjs/internal/operators/mergeMap";
import { Leader } from "./leader";
import { Member } from "./member";
import { TeamProjectStatus } from "./TeamProjectStatus";

export class Team {
    id? : number;
    teamName:String;
    idmembers: number[];
    idLeader : number
    leader  : Leader
    teamMember: Member[]
    startDate: Date
    dueDate: Date;
    statusProject: TeamProjectStatus

    constructor( teamName:String, idmembers:number[],idLeader : number){

        this.teamName = teamName;
        this.idmembers = idmembers;
        this.idLeader = idLeader;

    }

}
