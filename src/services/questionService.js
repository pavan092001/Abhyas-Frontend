import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";


export const fetchQuestionService = async(da)=>{
    const res = await api.get("/api/getQuestion",{
        params: {
            date:da,
        },
    });
    console.log('Response Data:', res.data);
   
    return await res.data;
}

export const uploadQuestionImg=async(data)=>{
    const res = await api.post("/api/uploadQuestion",data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
    console.log("res ",res);
    return await res.data;
}