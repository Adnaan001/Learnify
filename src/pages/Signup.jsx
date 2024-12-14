import { AuthTemplate } from "../components/Auth/AuthTemplate"
import signupImg from "../assets/images/signup.jpg"


export const Signup=()=>{
    return(
        <AuthTemplate
            title="Join the millions learning to code with Learnify for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            img={signupImg}
            formType="SignupForm"
        />
    )
}