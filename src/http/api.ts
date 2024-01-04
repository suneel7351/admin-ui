import { api } from "./clients"
import { credentials  } from "../types"
// auth service

export const login=(credentials:credentials)=>api.post("/auth/login",credentials)
export const self=()=>api.get("/auth/self")
export const Logout=()=>api.post("/auth/logout")