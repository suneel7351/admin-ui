export type credentials = {
    email: string
    password: string
}

export interface User {
    firstname: string
    _id: string
    email: string
    createdAt: string
    role:string
}

export interface Tenant{
    _id:string
    name:string
    address:string

}

export interface TenantData{
    name:string
    address:string

}


export interface UserData{
    firstName:string,
	lastName:string,
	role:string,
	email:string,
	password:string,
	tenantId:string
}