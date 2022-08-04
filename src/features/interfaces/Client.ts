
export interface Client{
    id: string
    firstName: string
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
    firstName: "",
    lastName: "",
    address:{
        country: "",
        city: "",
        roadName: "",
        roadNumber: ""
    }
}