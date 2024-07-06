import { Label, SingleDataSet } from "ng2-charts";
import { TaskPriority } from "./enum";
import { Member } from "./member";
import { Status } from "./status";
import { Team } from "./team";

export class Task {
    id?: number;
    taskName: String
    descriptionTask: String
    idMember: number
    state: String
    teamMember : Member
    taskPriority: TaskPriority
    priority:String
    //status: Status[]
    status: Status
    comments : Comment[]
    files : File []
    createdBy: String
    startedDate: Date
    deleveryDate: String
    constructor(deleveryDate: String,    startedDate: Date,
        descriptionTask: String, idMember: number, priority: String, state: String, taskName: string) {
        this.deleveryDate = deleveryDate;
          this.startedDate = startedDate;
        this.descriptionTask = descriptionTask;
        this.idMember = idMember;
        this.priority = priority;
        this.state = state;
        this.taskName = taskName;
    }


}
export interface TypePercentage{
    name: string;
    value: number;
}

export interface ApiDetail {
    intWeek : Number
    countTaskDto : TypePercentage []

}
export interface CountTaskTeamMember{
    countTaskDto : TypePercentage []
    teamMember : Member
    taskDateStatusDto : TaskDateStatusDto
    tasksAdvanced : TaskDateStatusDto

}
export class TaskMemberStatistic {
    teamMember : Member
    label : Label []
    status : SingleDataSet 
    taskDateStatusDto : TaskDateStatusDto
    tasksAdvancedList : TaskDateStatusDto

 constructor(teamMember: Member, label: Label [] ,status : SingleDataSet,taskDateStatusDto : TaskDateStatusDto,    tasksAdvancedList : TaskDateStatusDto
    ) {
     this.teamMember = teamMember;
     this.label = label;
     this.status = status;
     this.taskDateStatusDto = taskDateStatusDto;
     this.tasksAdvancedList = tasksAdvancedList;

    }
  
} 
export interface TaskStatistic {
    teamMember : Member
    task : Task[]
}
export interface TaskDateStatusDto{
    task : Task[]
    number : number
}
export interface DashboardMemberListDeatil {
    name : String
    series : TypePercentage []

}
export interface TeamTask {
    task : Task
    team : Team

}

