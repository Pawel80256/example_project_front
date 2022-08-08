import {createAsyncThunk, createSlice, Observable} from "@reduxjs/toolkit";
import {Client} from "../interfaces/Client";
import axios from "axios";

interface sliceState{
    clients:Client[];
}

const initialState:sliceState = {
    clients: []
};

export const fetchClients = createAsyncThunk<Client[]>(
    'clients/fetchClients',
    async () =>{
    return await axios.get('http://localhost:8080/api/clients');
})

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientAdded(state, action){
            state.clients.push(action.payload)
        },
        clientEditted(state, action){
            //call to API and replace client inside state with client returned from server
        },
        clientDeleted(state, action){
          state.clients.map(client => client.id !== action.payload) //temporary
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchClients.fulfilled, (state,action) =>{
            state.clients = action.payload;
        })
    }
})

export const {clientAdded} = clientsSlice.actions
export default clientsSlice.reducer