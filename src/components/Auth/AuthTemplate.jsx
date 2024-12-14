import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const AuthTemplate = ({ title, desc1, desc2, img, formType }) => {
    return (
        <div className="w-11/12 mx-auto my-8 text-white flex flex-col lg:flex-row items-center lg:items-start lg:justify-between p-8 lg:py-12 lg:px-24 rounded-lg bg-primary-600 border border-primary-400 shadow-lg">
            <div className="lg:max-w-[38%] flex flex-col gap-6">
                <h2 className="text-4xl font-semibold">{title}</h2>
                <p className="text-gray-300 text-lg">
                    {desc1} <em className="text-blue-500">{desc2}</em>
                </p>
                {formType === "LoginForm" ? <LoginForm /> : <SignupForm />}
            </div>
            
            <div className="max-w-[600px] w-full">
                <img src={img} alt="Auth illustration" className="rounded-md shadow-[2px_4px_50px_#fff] w-full h-auto object-cover" />
            </div>
        </div>
    );
};








// import { LoginForm } from "./LoginForm"
// import { SignupForm } from "./SignupForm"

// export const AuthTemplate=({title,desc1,desc2,img,formType})=>{
//     console.log("formType==>",formType);
//     return(
//         <div className="w-11/12 mx-auto my-8 text-white flex justify-between p-12">
//             <div className="max-w-[30%] flex flex-col gap-4">
//                 <h2 className="text-4xl">{title}</h2>
//                 <p className="text-gray-400">{desc1} <em className="text-purple-800 text-sm">{desc2}</em></p>
//                 {
//                     formType==="LoginForm"
//                     ?
//                     <LoginForm/>
//                     :
//                     <SignupForm/>
//                 }
//             </div>
//             <div>
//                 <img src={img} alt="" width={800} className="rounded-md shadow-[2px_4px_50px_#fff]"/>
//             </div>
//         </div>
//     )
// }