import {Label, SingleDataSet} from 'ng2-charts';
import {TaskPriority} from './enum';
import {Member} from './member';
import {Status} from './status';
import {Team} from './team';

export class Task {
    id?: number;
    taskName: string;
    descriptionTask: string;
    idMember: number;
    state: string;
    teamMember: Member;
    taskPriority: TaskPriority;
    priority: string;
    // status: Status[]
    status: Status;
    comments: Comment[];
    files: File [];
    createdBy: string;
    startedDate: Date;
    deleveryDate: string;

    constructor(deleveryDate: string, startedDate: Date, descriptionTask: string, idMember: number, priority: string, state: string, taskName: string) {
        this.deleveryDate = deleveryDate;
        this.startedDate = startedDate;
        this.descriptionTask = descriptionTask;
        this.idMember = idMember;
        this.priority = priority;
        this.state = state;
        this.taskName = taskName;
    }


}

export interface TypePercentage {
    name: string;
    value: number;
}

export interface ApiDetail {
    intWeek: number;
    countTaskDto: TypePercentage [];

}

export interface CountTaskTeamMember {
    countTaskDto: TypePercentage [];
    teamMember: Member;
    taskDateStatusDto: TaskDateStatusDto;
    tasksAdvanced: TaskDateStatusDto;

}

export class TaskMemberStatistic {
    teamMember: Member;
    label: Label [];
    status: SingleDataSet;
    taskDateStatusDto: TaskDateStatusDto;
    tasksAdvancedList: TaskDateStatusDto;

    constructor(teamMember: Member, label: Label [], status: SingleDataSet, taskDateStatusDto: TaskDateStatusDto, tasksAdvancedList: TaskDateStatusDto) {
        this.teamMember = teamMember;
        this.label = label;
        this.status = status;
        this.taskDateStatusDto = taskDateStatusDto;
        this.tasksAdvancedList = tasksAdvancedList;

    }

}

export interface TaskStatistic {
    teamMember: Member;
    task: Task[];
}

export interface TaskDateStatusDto {
    task: Task[];
    number: number;
}

export interface DashboardMemberListDeatil {
    name: string;
    series: TypePercentage [];

}

export interface TeamTask {
    task: Task;
    team: Team;

}

