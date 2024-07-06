import { Employee } from "./employee";

export interface Message {

    employees: Employee[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;


}
