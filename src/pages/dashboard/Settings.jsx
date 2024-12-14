import { ChangePassword } from "../../components/Dashboard/Settings/ChangePassword"
import { DeleteAccount } from "../../components/Dashboard/Settings/DeleteAccount"
import { UpdateDp } from "../../components/Dashboard/Settings/UpdateDp"
import { UpdateProfile } from "../../components/Dashboard/Settings/UpdateProfile"




export const Settings=()=>{

    return(
        <div className=" w-[65%] mx-4">
            <h2 className="text-4xl text-white mb-12 mt-4">Edit Profile</h2>
            <div className="flex flex-col gap-4 ml-12">
                {/* ****Change Profile Picture**** */}
                <UpdateDp/>
                {/* ****Change Profile Picture**** */}

                {/* ****Change Profile Info**** */}
                <UpdateProfile/>
                {/* ****Change Profile Info**** */}

                {/* ****Change Password**** */}
                <ChangePassword/>
                {/* ****Change Password**** */}

                {/* ****Delete Account**** */}
                <DeleteAccount/>
                {/* ****Delete Account**** */}
            </div>
        </div>
    )
}