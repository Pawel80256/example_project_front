
export interface Client{
    id: string
    name: string
    lastName: string
    address:{
        country: string
        city: string
        roadName: string
        roadNumber: string
    }
}
//obiekt inicjalizacyjny
export const InitialClient:Client ={
    id: "",
    name: "",
    lastName: "",
    address:{
        country: "",
        city: "",
        roadName: "",
        roadNumber: ""
    }
}