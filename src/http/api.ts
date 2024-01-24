import { api } from "./clients"
import { TenantData, UserData, credentials } from "../types"
// auth service

export const login = (credentials: credentials) => api.post("/auth/login", credentials)
export const self = () => api.get("/auth/self")
export const Logout = () => api.post("/auth/logout")
export const getUsers = (queryString: string) => api.get(`/users?${queryString}`)
export const getTenants = () => api.get("/tenants")
export const createUser = (userData: UserData) => api.post("/users", userData)
export const createTenant = (tenant: TenantData) => api.post("/tenants", tenant)