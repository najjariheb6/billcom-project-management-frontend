import { Employee } from "./employee";
import { Member } from "./member";

export interface DayOff 
{
    id?: number;
    idMembers:Member;
    idLeader: Employee;
    endDate: Date;
    startedDate: Date;
    statusProject: String;
    description: string;

    files: String[]
}

