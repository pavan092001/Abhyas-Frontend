import { api } from "./api";


export const signUpservice = async(credientials)=>{
    const res = await api.post("/api/auth/signup",credientials);
    console.log(res);
    return await res.data;
}


export const loginService = async(credientials)=>{
    const response = await api.post('/api/auth/signin',credientials);
    return await response.data;
}