import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Authbtn } from '../components/Auth/Authbtn';
import { IoIosArrowDropleft } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { sendOtp,signup } from '../services/operations/Authapis';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const VerifyEmail=()=>{
    const[otp,setOtp]=useState("");
    console.log(otp);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {signupData}=useSelector((state)=>state.auth);

    function submitHandler(e){
        e.preventDefault();

        const {firstName,lastName,email,password,confirmPassword,accountType}=signupData;
        console.log("otp==>",otp);
        dispatch(signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate))
    }
    return(
        <div className="w-11/12 mx-auto">
            <form action="" onSubmit={submitHandler}>
                <div className="w-[26%] flex flex-col gap-6 mx-auto mt-[10rem]">
                    <h2 className="text-white text-4xl font-semibold">Verify email</h2>
                    <p className="text-gray-400">A verification code has been sent to you. Enter the code below</p>
                    <OtpInput
                        value={otp}
                        onChange={(otpValue)=>{
                            setOtp(otpValue);
                        }}
                        numInputs={6}
                        renderSeparator={<span className='text-transparent mx-1'>-</span>}
                        renderInput={(props) =>(
                            <input 
                                {...props} 
                                style={
                                    {
                                        width:"50px",
                                        height:"55px"
                                    }
                                }
                                className='bg-slate-800 text-white mb-4 rounded-xl text-center border border-sky-400 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none'
                            />
                        )}
                    />
                    <Authbtn>
                            Verify Email
                    </Authbtn>
                    <div className='flex justify-between'>
                        <Link to={'/login'} className='text-white flex items-center gap-1'>
                            <IoIosArrowDropleft/>
                            <p>Back to login</p>
                        </Link>
                        <div className='text-purple-800 flex items-center gap-1 cursor-pointer' onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>
                            <FaClockRotateLeft/>
                            <p>Resend it</p>
                        </div>
                    </div>
                </div>  
            </form>
        </div>
    )
}  