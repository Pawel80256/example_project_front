import {createAsyncThunk} from "@reduxjs/toolkit";
import {Client} from "../interfaces/Client";
import axios from "axios";

export const addClient = createAsyncThunk<string,Client,{}>(
    'clients/addClient',
    async (client:Client) => {
        console.log("add dispatching")
        console.log(client)
        return (await axios.post('http://localhost:8080/api/client',client)).data;
    }
)

export const deleteClient = createAsyncThunk<void,string,{}>(
    'clients/deleteClient',
    async (id:string) =>{
        axios.delete('http://localhost:8080/api/client/'.concat(id))
    }
)

export const editClient = createAsyncThunk<string,Client,{}>(
    'clients/editClient',
        async (client:Client) =>{
            return (await axios.put('http://localhost:8080/api/client',client)).data
        }
)