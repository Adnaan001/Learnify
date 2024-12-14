import { endpoints } from "../apis"
import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { setLoading, setToken,setMaskedEmail } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"

const {
        SEND_OTP_API,
        SIGNUP_API,
        LOGIN_API,
        RESET_PASSWORD_TOKEN_API,
        RESET_PASSWORD_API
    }=endpoints

export function sendOtp(email,navigate){
    return async (dispatch)=>{
        const toastId=toast.loading('loading...');
        dispatch(setLoading(true));
        try{
            const result=await apiConnector('POST',SEND_OTP_API,{
                email
            });

            // console.log("OTP RESPONSE==>",result);

            if(!(result.data.success))
            {
                toast.error(result.data?.message);
            }
            else
            {
                toast.success(result.data?.message);
                navigate('/signup/verify-email');
            }
            toast.dismiss(toastId);
        }catch(e)
        {
            toast.dismiss(toastId);
            toast.error(e.message);
            console.log(e.message)
        }
    }
}

export function signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate){
    return async (dispatch)=>{
        const toastId=toast.loading('loading');
        try
        {
            // console.log('otp in signuppayload==>',otp);
            const result=await apiConnector('POST',SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,otp});
            // console.log("result signup==>",result);

            if(result.data?.message==="otp required")
                dispatch(sendOtp(email,navigate));
            else
            {
                toast.success('Account Created Successfully');
                navigate('/login');
            }

        }catch(e)
        {
            toast.error(e.response?.data?.message||e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }
        finally
        {
            toast.dismiss(toastId);
        }

    }
}

export function login(email,password,navigate){

    return async (dispatch)=>{
        const toastId=toast.loading('Loading..');
        setLoading(true);
        try{
            const result=await apiConnector('POST',LOGIN_API,{email,password});
            // console.log('Login result==>',result);
            dispatch(setToken(result.data?.token));
            localStorage.setItem("token",result.data?.token);
            localStorage.setItem("user",JSON.stringify(result.data?.user));
            dispatch(setUser(result.data?.user));
            toast.success(result.data?.message);
            navigate('/dashboard/my-profile');
        }catch(e)
        {
            toast.error(e.response?.data?.message||e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }
        finally{
            toast.dismiss(toastId);
            setLoading(false);
        }  
    }

}

export function logout(navigate){
    return async(dispatch)=>{
        const toastId=toast.loading('Loading..');
        try{
            dispatch(setToken(null));
            dispatch(setUser(null));
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            localStorage.removeItem("totalItems");
            localStorage.removeItem("cart");;
            localStorage.removeItem("totalPrice");

            
            toast.success("User Logged Out Succesfully");
            toast.dismiss(toastId);
            navigate('/login');

        }catch(e)
        {
            toast.error(e.message);
            console.error(e.message);
        }

    }
}

function maskEmail(email) {
    const [localPart, domain] = email.split("@");
    const maskedLocal = localPart.slice(0, 2) + "*".repeat(localPart.length - 2);
    return `${maskedLocal}@${domain}`;
}

export function resetPasswordToken(email, setEmailSent,navigate){
    return async (dispatch)=>{
        const toastId=toast.loading('Loading..');
        try{
            
            const result=await apiConnector('POST',RESET_PASSWORD_TOKEN_API,{email});
            // console.log("resetpasswordtoken result==>",result);
            dispatch(setMaskedEmail(maskEmail(email)));
            toast.success(result.data?.message);
            setEmailSent(true);
        }catch(e)
        {
            toast.error(e.response?.data?.message||e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }
        finally{
            toast.dismiss(toastId);
        }
    }
}

export function resetPassword(password,confirmPassword,navigate){
    return async (dispatch)=>{
        const toastId=toast.loading('Loading..');
        try{
            const token=location.pathname.split('/').at(-1);
            // console.log("token==>",token);
            const result=await apiConnector('POST',RESET_PASSWORD_API,{token,password,confirmPassword});
            // console.log("resetpassword result==>",result);
            toast.success(result.data?.message);
            navigate('/resetconfirmation');
        }catch(e){
            toast.error(e.response?.data?.message||e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId);
        } 
    }
}