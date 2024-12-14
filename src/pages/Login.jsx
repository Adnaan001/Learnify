import { AuthTemplate } from "../components/Auth/AuthTemplate"
import loginImg from "../assets/images/login.jpg"


export const Login=()=>{
    return(
        <AuthTemplate
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            img={loginImg}
            formType="LoginForm"
        />
    )
} 