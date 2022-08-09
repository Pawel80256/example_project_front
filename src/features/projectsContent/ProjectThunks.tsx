import {createAsyncThunk} from "@reduxjs/toolkit";
import {Project} from "../interfaces/Project";
import axios from "axios";

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