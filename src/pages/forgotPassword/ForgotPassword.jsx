import { useEffect, useState } from "react"
import { Authbtn } from "../../components/Auth/Authbtn"
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordToken } from "../../services/operations/Authapis";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";

export const ForgotPassword=()=>{

    const [email,setEmail]=useState("");
    const [emailSent,setEmailSent]=useState(false);

    const {maskedEmail}=useSelector((state)=>state.auth);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    function submitHandler(e){
        e.preventDefault();
        console.log(email);
        dispatch(resetPasswordToken(email, setEmailSent, navigate));
    }  
    return(
        <div className="w-11/12 mx-auto text-white mt-[6rem]">
            <div className="w-[28%] mx-auto flex flex-col gap-4 bg-primary-700  p-8 lg:p-12 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold">
                    {
                        emailSent 
                        ? 
                        (<span>Check email</span>)
                        :
                        (<span>Reset your password</span>)
                    }
                </h2>
                <p className="text-gray-400">
                    {
                        emailSent 
                        ? 
                        (<span>We have sent the reset email to {maskedEmail}</span>)
                        :
                        (<span>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</span>)
                    }
                </p>
                <form action="" onSubmit={submitHandler}>
                    {
                        (!emailSent) 
                        &&
                        <div className="flex flex-col gap-1 my-6">
                        <label 
                            htmlFor="email"
                            className="text-gray-200">
                                Email Address<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="email" 
                            placeholder="Enter email address"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                        />
                        </div>
                    }
                    {/* =================== */}
                    {
                        emailSent 
                        ?
                        (
                            <Authbtn>
                            Resend email
                            </Authbtn>
                        )
                        :
                        (
                            <Authbtn>
                            Reset Password
                            </Authbtn>
                        )
                    }
                </form>

                <Link to={'/login'} className='text-white flex items-center gap-1'>
                    <IoIosArrowDropleft/>
                    <p>Back to login</p>
                </Link>
            </div>
        </div>
    )
}