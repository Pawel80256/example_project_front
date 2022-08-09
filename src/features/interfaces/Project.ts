import {Client} from "./Client";

export interface Project{
    id:string,
    name: string,
    clients: Client[]
}
