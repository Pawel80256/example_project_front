import {createAsyncThunk, createSlice, Observable} from "@reduxjs/toolkit";
import {Client} from "../interfaces/Client";
import axios from "axios";
import {addClient, deleteClient, editClient} from "./clientThunks";

export interface sliceState{
    clients:Client[];
}

const initialState:sliceState = {
    clients: []
};

export const fetchClients = createAsyncThunk<Client[]>(
    'clients/fetchClients',
    async () =>{
        return (await axios.get('http://localhost:8080/api/clients')).data;
})

// export const addClient = createAsyncThunk(
//     'clients/addClient',
//     async (client:Client) => {
//         await axios.post('http://localhost:8080/api/client',client);
//
//     }
// )

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchClients.fulfilled, (state,action) =>{
            console.log("in reducer")
            state.clients = action.payload;
        })
        builder.addCase(addClient.fulfilled,(state,action)=>{
            const client:Client = {...action.meta.arg,id:action.payload }
            state.clients.push(client)
        })
        builder.addCase(deleteClient.fulfilled,(state,action)=>{
            state.clients = state.clients.filter(client => client.id !== action.meta.arg)
        })
        builder.addCase(editClient.fulfilled,(state,action) =>{
            const clientId = action.payload
            console.log(clientId)

            const clientIndex = state.clients.findIndex(client => client.id === clientId)
            state.clients[clientIndex] = {...action.meta.arg,id:clientId}
            // state.clients = state.clients.map(c => {
            //     if(c.id === clientId){
            //         return {...action.meta.arg,id:clientId}
            //     }else {
            //         return c
            //     }
            // })

        })
    }
})

export const {} = clientsSlice.actions
export default clientsSlice.reducer