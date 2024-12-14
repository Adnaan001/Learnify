import { useState } from "react";
import { CountryData } from "../../data/country-data";
import { CTAbtn } from "./CTAbtn";
import { Authbtn } from "../Auth/Authbtn";
import { useDispatch } from "react-redux";
import { submitForm } from "../../services/operations/CommonApis";
import { useForm } from "react-hook-form";

export const ContactForm=()=>{

    const {register,reset,handleSubmit,formState:{errors}}=useForm({
        defaultValues:{
            firstName:"",
            lastName:"",
            email:"",
            callingCode:"91",
            phone:"",
            message:""
        }
    });
    
    function changeHandler(e){
        setFormData((prevData)=>{
            console.log()
            return{
                ...prevData,
                [e.target.name]:e.target.value
            }
        })
    }
    const dispatch=useDispatch();
    function submitHandler(data){
        // console.log('contact us data is ==>',data);
        dispatch(submitForm(data.firstName,data.lastName,data.email,data.callingcode,data.phone,data.message));
        reset();
    }

    return(
        <form action="" className="flex flex-col gap-8 bg-primary-700  p-8 lg:p-12 rounded-lg shadow-lg" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex gap-4 ">
                <div className="flex flex-col gap-1 w-[50%]">
                    <label 
                        htmlFor="firstName"
                        className="text-gray-200">
                            First Name
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter first name"
                        id="firstName"
                        name="firstName"
                        // value={formData.firstName}
                        // onChange={changeHandler}
                        {...register("firstName",{required:"FirstName is Required"})}
                        className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    />
                    {
                        errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>
                    }
                </div>
                <div className="flex flex-col gap-1 w-[50%]">
                    <label 
                        htmlFor="lastName"
                        className="text-gray-200">
                            Last Name
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter last name"
                        id="lastName"
                        name="lastName"
                        // value={formData.lastName}  
                        // onChange={changeHandler}
                        {...register("lastName",{required:"LastName is Required"})}
                        className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    />
                    {
                        errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="email"
                    className="text-gray-200">
                        Email Address
                </label>
                <input
                    type="email" 
                    placeholder="Enter email address"
                    id="email"
                    name="email"
                    // value={formData.email}
                    // onChange={changeHandler}
                    {...register("email",{required:"Email is Required"})}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                {
                    errors.email && <p className="text-red-600">{errors.email.message}</p>
                }
            </div>
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="callingCode"
                    className="text-gray-200">
                        Phone Number
                </label>
                <div className="flex gap-4">
                    <div className="w-[12%]">
                        <select 
                            // onChange={changeHandler}
                            {...register("callingCode")}
                            name="callingCode" 
                            id="callingCode" 
                            className="bg-primary-500 text-gray-300 py-3 rounded-xl shadow-[1px_2px_4px_#3a3949] cursor-pointer w-[100%]">
                                {
                                    CountryData.map((data,index)=>(
                                        <option key={index} value={data.value}>{data.name}</option>
                                    ))
                                }
                        </select>
                    </div>
                    <input
                        type="number" 
                        placeholder="Enter your number"
                        id="phone"
                        name="phone"
                        // value={formData.phone}
                        // onChange={changeHandler}
                        {...register("phone")}
                        className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="message"
                    className="text-gray-200">
                        Message
                </label>
                <textarea
                    placeholder="Let us know what’s on your mind..."
                    rows={10}
                    id="message"
                    name="message"
                    // value={formData.message}
                    // onChange={changeHandler}
                    {...register("message",{required:"Please write some message"})}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                {
                    errors.message && <p className="text-red-600">{errors.message.message}</p>
                }
            </div>
            <Authbtn>
                Send Message
            </Authbtn>
        </form>
    )
}