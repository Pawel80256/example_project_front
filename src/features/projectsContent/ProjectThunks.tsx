import {createAsyncThunk} from "@reduxjs/toolkit";
import {Project} from "../interfaces/Project";
import axios from "axios";
import exp from "constants";

export const fetchProjects = createAsyncThunk<Project[]>(
    'projects/fetchProjects',
    async () => {
        return (await axios.get('http://localhost:8080/api/projects')).data;
    }
)

export const addProject = createAsyncThunk<string,Project,{}>(
    'projects/addProject',
    async(project:Project)=>{
        return (await axios.post('http://localhost:8080/api/project',project)).data;
    }
)

export const deleteProject = createAsyncThunk<void,string>(
    'projects/deleteProject',
    async(projectId:string)=>{
        await axios.delete('http://localhost:8080/api/project/'.concat(projectId));
    }
)

export const editProject = createAsyncThunk<void,Project>(
    'projects/editProject',
    async (project:Project) => {
        await axios.put('http://localhost:8080/api/project',project)
    }
)