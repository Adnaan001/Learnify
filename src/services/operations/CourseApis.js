import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { setCourse,setStep,setEditCourse } from "../../slices/courseSlice";
import { apiConnector } from "../apiconnector";


const {
    CREATE_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    CREATE_SECTION,
    UPDATE_SECTION,
    DELETE_SECTION,
    CREATE_SUBSECTION,
    UPDATE_SUBSECTION,
    DELETE_SUBSECTION,
    GET_ALL_COURSES,
    GET_ENROLLED_COURSES,
    GET_COURSE_DETAILS,
    GET_COURSE_PROGRESS,
    SET_COURSE_PROGRESS,
    SET_COURSE_RATING
}=courseEndpoints

export function createCourse(formData){
    return async(dispatch)=>{
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('POST',CREATE_COURSE,formData);
            // console.log("result in update profile is ==>",result);
            dispatch(setCourse(result.data?.coursesResponse));
            dispatch(setStep(2));
            dispatch(setEditCourse(true));
            toast.success(result.data?.message)

        }catch(e){
            if (e.response?.status === 400 && e.response?.data?.Error && e.response?.data?.Error.includes('File size')) {
                toast.error("The file size must be less than 10 MB.");
            } else {
                toast.error(e.response?.data?.message || e.message);
            }
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}      

export function updateCourse(formData,navigate){
    return async(dispatch)=>{
        console.log("updatecourseAPI Called....");
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('PUT',UPDATE_COURSE,formData);
            console.log("result in update course is ==>",result);

            if(navigate){
                navigate('/dashboard/my-courses');
                dispatch(setStep(1));
            }
            else{
                dispatch(setCourse(result.data?.coursesResponse));
                dispatch(setStep(2));
                dispatch(setEditCourse(true));
            }

            toast.success(result.data?.message)

        }catch(e){
            if (e.response?.status === 400 && e.response?.data?.Error && e.response?.data?.Error.includes('File size')) {
                toast.error("The file size must be less than 10 MB.");
            } else {
                toast.error(e.response?.data?.message || e.message);
            }
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}

export function deleteCourse(courseId,setCourseDeleteModal){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading.....");
        try{
            const result= await apiConnector('DELETE',DELETE_COURSE,{courseId});
            console.log("deleteCourse Result==>",result);
            toast.success(result.data?.message);
            setCourseDeleteModal("");
            
        }catch(e){
            toast.error(e.response?.data?.message || e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}

export function rateCourse(rating,review,courseId){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const result=await apiConnector("POST",SET_COURSE_RATING,{rating,review,courseId});
            toast.success(result.data?.message);
        }catch(e){
            console.error(e.response.data?.ERROR || e.message);
            toast.error(e.response.data?.message)
        }
        toast.dismiss(toastId)
    }
}

export async function getUserEnrolledCourses(){
    
    const toastId=toast.loading("Loading....");
    try{   
        const result=await apiConnector("GET",GET_ENROLLED_COURSES);
        // toast.success(result.data?.message);
        return result.data?.courses;
    }catch(e){
        toast.error(e.response.data?.message || e.message);
        console.log("ERROR==>",e.response.data?.ERROR);
    }finally{
        toast.dismiss(toastId);
    }
}

export async function getCourseDetails(courseId){
    const toastId=toast.loading("Loading...");
    try{
        console.log("getCourse apiconnector called....");
        console.log("courseid==>",courseId)
        const result=await apiConnector('POST',GET_COURSE_DETAILS,{courseId});
        // toast.success(result.data?.message);
        return result.data?.Response;
    }catch(e){
        toast.error(e.response.data?.message || e.message);
        console.error(e.response.data?.ERROR);
    }finally{
        toast.dismiss(toastId);
    }
}

export async function getCourseProgress(courseId){
    try{
        console.log("in getCourseProgress api....")
        const result=await apiConnector("POST",GET_COURSE_PROGRESS,{courseId});

        // console.log("result of getCourseProgress==>",result)
        return result.data.progressRes;
    }catch(e){
        toast.error(e.response.data?.message || e.message);
        console.error(e.response.data?.ERROR);
    }
}

export function setCourseProgress(courseId,subSectionId){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const result=await apiConnector("PUT",SET_COURSE_PROGRESS,{courseId,subSectionId});
            toast.success(result.data?.message);
        }catch(e){
            toast.error(e.response.data?.message || e.message);
            console.error(e.response.data?.ERROR);
        }
        toast.dismiss(toastId);
    }
}

export function createSection(sectionName,courseId){
    return async(dispatch)=>{
        console.log("crete setion API called")
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('POST',CREATE_SECTION,{sectionName,courseId});
            // console.log("result in create section is ==>",result);
            dispatch(setCourse(result.data?.courseResponse));
            toast.success(result.data?.message)

        }catch(e){
            toast.error(e.response?.data?.message || e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}   

export function updateSection(sectionName,sectionId,courseId){
    return async(dispatch)=>{
        console.log("update section API called")
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('PUT',UPDATE_SECTION,{sectionName,sectionId,courseId});
            // console.log("result in update section is ==>",result);
            dispatch(setCourse(result.data?.courseResponse));
            toast.success(result.data?.message)

        }catch(e){
            toast.error(e.response?.data?.message || e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}     

export function deleteSection(sectionId,courseId,setSectionModal){
    return async(dispatch)=>{
        console.log("update section API called")
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('DELETE',DELETE_SECTION,{sectionId,courseId});
            // console.log("result in update section is ==>",result);
            dispatch(setCourse(result.data?.courseResponse));
            setSectionModal((prev)=>!prev)
            toast.success(result.data?.message);
        }catch(e){
            toast.error(e.response?.data?.message || e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}  

export function createSubSection(formData,setModal,callback){
    return async(dispatch)=>{
        console.log("crete subSection API called")
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('POST',CREATE_SUBSECTION,formData);
            console.log("result in create subSection is ==>",result);
            dispatch(setCourse(result.data?.courseResponse));
            toast.success(result.data?.message);
            setModal(false);

            if(callback)
                callback();

        }catch(e){
            if (e.response?.status === 400 && e.response?.data?.Error && e.response?.data?.Error.includes('vidFile')) {
                toast.error("Upload the video once again");
            } else if(e.response?.status === 400 && e.response?.data?.Error && e.response?.data?.Error.includes('mongodb')) {
                toast.error("There is some problem with the database try after some time");
            } else if(e.response?.status === 400 && e.response?.data?.Error && e.response?.data?.Error.includes('Server returned unexpected status code - 413')){
                toast.error("The video file is too large. Please upload a file under 50 MB.");
            } else {
                toast.error(e.response?.data?.message || e.message);
            }
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}  

export function updateSubSection(formData,setModal){
    return async(dispatch)=>{
        console.log("updating subSection API called")
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('PUT',UPDATE_SUBSECTION,formData);
            console.log("result in update subSection is ==>",result);
            dispatch(setCourse(result.data?.courseResponse));
            toast.success(result.data?.message);
            setModal(false);

        }catch(e){
            if (e.response?.status === 400 && e.response?.data?.Error && e.response?.data?.Error.includes('vidFile')) {
                toast.error("Upload the video once again");
            } else if(e.response?.status === 400 && e.response?.data?.Error && e.response?.data?.Error.includes('mongodb')) {
                toast.error("There is some problem with the database try after some time");
            } else {
                toast.error(e.response?.data?.message || e.message);
            }
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}  

export function deleteSubSection(subSectionId,sectionId,courseId,setSubSectionDeleteModal){
    return async(dispatch)=>{
        console.log("update section API called")
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('DELETE',DELETE_SUBSECTION,{subSectionId,sectionId,courseId});
            // console.log("result in update section is ==>",result);
            dispatch(setCourse(result.data?.courseResponse));
            setSubSectionDeleteModal(false);
            toast.success(result.data?.message);
        }catch(e){
            toast.error(e.response?.data?.message || e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}  