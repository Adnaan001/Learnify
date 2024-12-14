import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CTAbtn } from "../../components/Common/CTAbtn";
import { IoIosArrowDropleft } from "react-icons/io";

export const ResetConfirmation = () => {
    const { maskedEmail } = useSelector((state) => state.auth);

    return (
        <div className="w-11/12 mx-auto text-white mt-[10rem]">
            <div className="w-[28%] mx-auto flex flex-col gap-4 bg-primary-700  p-8 lg:p-12 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold">Reset complete!</h2>
                <p className="text-gray-400">
                    All done! You can now return to the login page.
                </p>
                <CTAbtn active={true} linkto={'/login'}>
                    <span>Return to login</span>
                </CTAbtn>
                <Link to={'/login'} className='text-white flex items-center gap-1'>
                    <IoIosArrowDropleft/>
                    <p>Back to login</p>
                </Link>
            </div>
        </div>
    );
};
