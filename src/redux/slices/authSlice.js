import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginService, signUpservice } from '../../services/authService';

export const St = {
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
};


const initialState = {
  jwt:null,
  user:null,
  status:St.LOADING,
}


export const signup= createAsyncThunk("user/signup",async(credientials)=>{
  return await signUpservice(credientials);
  
})


export const login = createAsyncThunk("user/login",async(credientials)=>{
    const res = await loginService(credientials);
    return res;
});



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers:(builder)=>{
    builder
    .addCase(login.pending,(state)=>{
        state.status=St.LOADING;
    }).addCase(login.fulfilled,(state,action)=>{
        state.jwt=action.payload.jwt;
        state.user=action.payload.user;
        localStorage.setItem("jwt",action.payload.jwt);
        localStorage.setItem("CSRF_TOKEN",action.payload.csrfToken);
        console.log("csrf ",action.payload.csrfToken);
        state.status=St.IDLE;
    }).addCase(login.rejected,(state)=>{
        state.status=St.ERROR;
    }).addCase(signup.pending,(state)=>{
       state.status = St.LOADING;
    }).addCase(signup.rejected,(state)=>{
       state.status=St.ERROR;
    }).addCase(signup.fulfilled,(state,action)=>{
      state.status=St.IDLE;
      state.jwt = action.payload.jwt;
      localStorage.setItem("jwt",action.payload.jwt);
      state.user = action.payload.user;
    });
  }
})

// Action creators are generated for each case reducer function

export default authSlice.reducer;