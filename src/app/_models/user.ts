import { Roles } from "./Roles";

export interface User {
    [x: string]: any;
    id: number;
    firstName: string;
    login:string;
    age:number
    salary: number
    name: string
    birthday: Date
    roles: Roles[] ;
    lastName: string;
    username: string;
    token?: string;
}
