import {Project} from "../interfaces/Project";
import {createSlice} from "@reduxjs/toolkit";
import {addProject, fetchProjects} from "./ProjectThunks";

interface ProjectState{
    projects: Project[]
}

const initialState: ProjectState = {
    projects:[]
}

const projectSlice = createSlice(
    {
        name:"clients",
        initialState,
        reducers:{},
        extraReducers: builder =>
        {
            builder.addCase(fetchProjects.fulfilled,(state,action)=>{
                state.projects = action.payload
            })
            builder.addCase(addProject.fulfilled,(state,action)=>{
                const project:Project = {...action.meta.arg, id:action.payload}
                state.projects.push(project)
            })
        }
    }
)

export default projectSlice.reducer;