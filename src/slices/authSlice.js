import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:localStorage.getItem("token") ? localStorage.getItem("token"):null,
    signupData:{},
    maskedEmail:"@xyz.com",
    loading:true
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload;
        },
        setSignUpData:(state,action)=>{
            state.signupData=action.payload;
        },
        setMaskedEmail:(state,action)=>{
            state.maskedEmail=action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        }
    }
})


export const {setToken,setSignUpData,setLoading,setMaskedEmail}=authSlice.actions;
export default authSlice.reducer;
