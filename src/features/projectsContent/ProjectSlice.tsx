import {Project} from "../interfaces/Project";
import {createSlice} from "@reduxjs/toolkit";
import {addProject, deleteProject, editProject, fetchProjects} from "./ProjectThunks";

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
            builder.addCase(deleteProject.fulfilled,(state,action) => {
                state.projects = state.projects.filter(project => project.id !== action.meta.arg)
            })
            builder.addCase(editProject.fulfilled,(state,action) => {
                const projectId = action.meta.arg.id;
                const projectIndex = state.projects.findIndex(project => project.id === projectId)
                state.projects[projectIndex] = {...action.meta.arg, id:projectId}
            })
        }
    }
)

export default projectSlice.reducer;