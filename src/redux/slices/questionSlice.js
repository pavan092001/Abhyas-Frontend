import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//import { loginService } from '../../services/authService';
import { St } from './authSlice';
import { fetchQuestionService } from '../../services/questionService';

const initialState = {
  questions:[],
  status:St.LOADING,
}

export const fetchQuestion = createAsyncThunk("fetch/questions",async(date)=>{
  const res = await fetchQuestionService(date);
  console.log(res);
  return res;
});



export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchQuestion.pending,(state)=>{
        state.status=St.LOADING;
    }).addCase(fetchQuestion.fulfilled,(state,action)=>{
        state.questions=action.payload;
       // console.log("payload ",action.payload);
        state.status=St.IDLE;
    }).addCase(fetchQuestion.rejected,(state,action)=>{
        state.status=St.ERROR;
    })
  }
})

export default questionSlice.reducer;