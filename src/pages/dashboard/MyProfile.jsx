import { useSelector } from "react-redux"
import {CTAbtn} from "../../components/Common/CTAbtn"
import { TbEdit } from "react-icons/tb";


export const MyProfile=()=>{
    const {user}=useSelector((state)=>state.profile);
    console.log("user in myprofile==>",user);
    console.log("user.personalDetails",user.personalDetails.dob);
    const personalData=[
        {
            title:"First Name",
            val:user?.firstName,
        },
        {
            title:"Last Name",
            val:user?.lastName
        },
        {
            title:"Email",
            val:user?.email,
        },
        {
            title:"Contact Number",
            val:(user.personalDetails?.phone) ? (`+${user.personalDetails?.callingCode} ${user.personalDetails?.phone}`):null
        },
        {
            title:"Gender",
            val:user?.personalDetails?.gender
        },
        {
            title:"Date of Birth",
            val:user?.personalDetails?.dob
        }
    ]
    return(
        <div className="mb-24 mx-4 w-[60%]">
            <h2 className="text-4xl text-white mb-12 mt-4">My Profile</h2>
            <div className="flex flex-col gap-4 ml-12">
                <div className="bg-primary-600 border border-primary-400 shadow-lg rounded-md p-8 flex justify-between">
                    <div className="flex gap-2 items-center">
                        <img src={user.image} alt="" className=" aspect-square w-16 rounded-full object-cover"/>
                        <div>
                            <p className="text-white font-bold text-lg">{user?.firstName} {user.lastName}</p>
                            <p className="text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                    {/* ---------- */}
                    <CTAbtn active={true} extra={true} linkto={'/dashboard/settings'}>
                        Edit
                        <TbEdit/>
                    </CTAbtn>
                </div>
                <div className="bg-primary-600 border border-primary-400 shadow-lg p-8 rounded-md flex justify-between">
                    <div className="w-[50%]">
                        <p className="text-white font-bold text-lg mb-6">About</p>
                        {
                            user.personalDetails?.about ?
                            (
                                <p className="text-gray-400">{user?.personalDetails?.about}</p>
                            )
                            :
                            (
                                <p className="text-gray-400">Write Somthing About Yourself</p>
                            )
                        }
                    </div>
                    <CTAbtn active={true} extra={true} linkto={'/dashboard/settings'} >
                        <span>Edit</span>
                        <TbEdit/>
                    </CTAbtn>
                </div>
                <div className="bg-primary-600 border border-primary-400 shadow-lg rounded-md p-8 flex justify-between">
                        <div>
                            <p className="text-white font-bold text-lg mb-6"> Personal Details</p>
                            <div className="w-[80%] h-[50%] grid grid-cols-2 gap-5 gap-x-32">
                                {
                                    personalData.map((data,index)=>(
                                        <div key={index}>
                                            <p className="text-gray-400 text-xs">{data.title}</p>
                                            <p className="text-white">
                                                {
                                                    data.val?
                                                    (data.val)
                                                    :
                                                    (`Add ${data.title}`)
                                                }
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <CTAbtn active={true} extra={true} linkto={'/dashboard/settings'} >
                            <span>Edit</span>
                            <TbEdit/>
                        </CTAbtn>
                </div>
            </div>

        </div>
    )
}