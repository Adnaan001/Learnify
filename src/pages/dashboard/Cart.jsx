import { useDispatch, useSelector } from "react-redux"
import { RatingStars } from "../../components/Common/RatingStars";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Dbtn } from "../../components/Common/Dbtn";
import { removeFromCart } from "../../slices/cartSlice";
import { buyCourse } from "../../services/operations/StudentEnrollmentApi";
import { useNavigate } from "react-router";

export const Cart=()=>{

    const {cart,totalItems,totalPrice}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);

    function handleBuyNow(){
        if(token)
            buyCourse(token,cart,user,navigate,dispatch);
            return;
    }

    return(
        <div className=" mx-4">
            <h2 className="text-4xl text-white mb-12 mt-4">Cart</h2>
            <div className="w-[70rem]">
                {
                    totalItems==0
                    ? (<p className="text-white">Your Cart is empty</p>)
                    : (
                        <div>
                            <div>
                                <p className="p-2 mb-4 text-gray-400 border-b-2 border-primary-400">{totalItems} Course(s) in Cart</p>
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-6 w-[70%]">
                                        {
                                            cart.map((course)=>(
                                                <div key={course._id} className="flex justify-between">
                                                    <div className="flex gap-4">
                                                        <div>
                                                            <img src={course.thumbnail} alt="" width={150} height={150} />
                                                        </div>
                                                        <div className="flex gap-4 flex-col">
                                                            <p className="text-white text-lg">{course.title}</p>
                                                            <p className="text-gray-400 text-sm">{course.description}</p>
                                                            <RatingStars courseId={course._id} className={"text-secondary-400"} ratingLength={course?.ratingAndReview.length}/>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <button 
                                                            className="text-red-500 bg-primary-400 py-2 px-4 border flex items-center
                                                            gap-1 border-primary-400 rounded-md font-semibold hover:border-white "
                                                            onClick={()=>dispatch(removeFromCart(course._id))}
                                                        >
                                                            <RiDeleteBin5Line/>
                                                            Remove
                                                        </button>
                                                        <div className="text-secondary-400 self-end text-xl font-semibold">
                                                        ₹ {course.price}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="bg-primary-600 p-6 rounded-md h-fit w-[25%] flex flex-col gap-4 self-end">
                                        <p className="text-gray-400">Total:</p>
                                        <p className="text-secondary-400 font-bold text-2xl">₹ {totalPrice}</p>
                                        <Dbtn 
                                            active={true}
                                            onClick={handleBuyNow}
                                        >
                                            Buy Now
                                        </Dbtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}