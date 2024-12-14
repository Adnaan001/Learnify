import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dbtn } from "../../Common/Dbtn";
import dayjs from "dayjs";
import { CountryData } from "../../../data/country-data";
import { updateProfile } from "../../../services/operations/ProfileApis";


export const UpdateProfile=()=>{
    const {user}=useSelector((state)=>state.profile);
    const {register,reset,handleSubmit,formState:{errors},control,watch}=useForm({
        defaultValues:{
            firstName:user.firstName,
            lastName:user.lastName,
            dob:user.personalDetails.dob,
            gender:"Male",
            callingCode:"+91",
            phone:"",
            about:""
        }
    });    

    const dispatch=useDispatch();
    function submitDetails(data){
        // console.log("personal Details",data);
        dispatch(updateProfile(data.firstName,data.lastName,data.gender,data.dob,data.callingCode,data.phone,data.about));
    }
    return(
        <div>
            <div className="bg-primary-600 border border-primary-400 shadow-lg rounded-md p-8 flex flex-col gap-4">
                <p className="text-white font-medium text-xl">Profile Information</p>
                <form className=" grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="firstName"
                            className="text-gray-200">
                                First Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter first name"
                            id="firstName"
                            {...register("firstName",{required:"FirstName is Required"})}
                            className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[0px_1px_2px_#8DA9D0]"
                        />
                        {
                            errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="lastName"
                            className="text-gray-200">
                                Last Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter last name"
                            id="lastName"
                            {...register("lastName",{required:"LastName is Required"})}
                            className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[0px_1px_2px_#8DA9D0]"
                        />
                        {
                            errors.lastName && <p className="text-red-600">{errors.firstName.message}</p>
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="DOB"
                            className="text-gray-200">
                                Date of Birth
                        </label>
                        <Controller
                            name="dob"
                            control={control}
                            rules={{required:"Date of Birth is Required"}}
                            render={({field})=>(
                                <DatePicker
                                    selected={field.value} 
                                    placeholderText="MM/DD/YYY"                            
                                    onChange={(date)=>{
                                        console.log("date is=>",date)
                                        date
                                        ?                                                //And .format("") is its function/method
                                        field.onChange(dayjs(date).format("MM-DD-YYYY"))//Here dayjs is used to parse the date rom the calender so that it is readable
                                        :
                                        null
                                    }}                                                  

                                    className="bg-primary-500 text-white py-3 pl-3 w-[100%] rounded-xl shadow-[0px_1px_2px_#8DA9D0]"
                                />
                            )}
                        />
                        {
                            errors.dob && <p className="text-red-600">{errors.dob.message}</p>
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="gender"
                            className="text-gray-200">
                                Gender
                        </label>
                        <select
                            id="gender"
                            {...register("gender",{required:"Gender is Required"})}
                            className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[0px_1px_2px_#8DA9D0]"
                        >
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>
                        {
                            errors.gender && <p className="text-red-600">{errors.firstName.message}</p>
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="callingCode"
                            className="text-gray-200">
                                Phone Number
                        </label>
                        <div className="flex gap-4">
                            <div className="w-[20%]">
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
                                {...register("phone",{required:"Please fill this field"})}
                                className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                            />
                            {
                                errors.phone && <p className="text-red-600">{errors.phone.message}</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="about"
                            className="text-gray-200">
                                About
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter Bio Details"
                            id="about"
                            {...register("about")}
                            className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[0px_1px_2px_#8DA9D0]"
                        />
                    </div>
                </form>
            </div>
            <div className="flex gap-4 justify-end my-8">
                <div onClick={handleSubmit(()=>reset())}>
                    <Dbtn>
                        cancel
                    </Dbtn>
                </div>
                <div onClick={handleSubmit(submitDetails)}>
                    <Dbtn active={true}>
                        Save
                    </Dbtn>
                </div>
            </div>
        </div>
    )
}