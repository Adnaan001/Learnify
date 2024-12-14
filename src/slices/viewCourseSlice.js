import { createSlice } from "@reduxjs/toolkit"


const initialState={
    courseEntireData:null,
    courseSectionData:null,
    totalNoOfLectures:0,
    completedVideos:null
}

const viewCourseSlice=createSlice({
    name:'viewcourse',
    initialState,
    reducers:{
        setCourseEntireData:(state,action)=>{
            state.courseEntireData=action.payload;
        },
        setCourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload;
        },
        setTotalLectures:(state,action)=>{
            state.totalNoOfLectures=action.payload;
        },
        setCompletedVideos:(state,action)=>{
            state.completedVideos=action.payload;
        },
        updateCompletedVideos:(state,action)=>{
            state.completedVideos=[...state.completedVideos,action.payload];
        }
    }
})


export const {setCourseEntireData,setCourseSectionData,setTotalLectures,setCompletedVideos,updateCompletedVideos}=viewCourseSlice.actions;
export default viewCourseSlice.reducer;