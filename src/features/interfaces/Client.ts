
export interface Client{
    id: string
    firstName: string
    lastName: string
    country: string
    city: string
    roadName: string
    roadNumber: string
}
//obiekt inicjalizacyjny
export const InitialClient:Client ={
    id: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    roadName: "",
    roadNumber: ""
}