import { Employee } from "./employee";
import { Team } from "./team";

export interface Project {
    id?: number;
    name: String;
    description: string;
    endDate: Date;
    startedDate: Date;
    statusProject: String;
    charge: number;

    projectLeader: Employee;
    teamList: Team[];
    files: String[]
}

export interface ProjectList {
    project: Project;
    progress:number;
}