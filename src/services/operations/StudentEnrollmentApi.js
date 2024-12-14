import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { resetCart } from "../../slices/cartSlice";

const {CAPTURE_PAYMENT,VERIFY_PAYMENT,SEND_PAYMENT_SUCCESS_EMAIL}=studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true);
        }  

        script.onerror=()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId=toast.loading("Loading...");
    try{
        const res= await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res)
        {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const orderResponse=await apiConnector("POST",CAPTURE_PAYMENT,{courses});

        // console.log("orderResponse==>",orderResponse);
        if(!orderResponse.data.success)
            throw new Error(orderResponse.data.message);

        // console.log("orderResponse.data.message.id==>",orderResponse.data.message.amount)
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY, 
            amount: orderResponse.data.message.amount,
            currency: orderResponse.data.message.currency,
            name: 'Learnify',
            description: 'Thank You for Purchasing the Course',
            order_id: orderResponse.data.message.id, 
            // callback_url: 'http://localhost:4000/payment/verifyPayment',
            prefill: {
              name: userDetails.firstName,
              email: userDetails.email,
            },
            handler: function(response){
                //payment successful email
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
                
                //verifyPayment api call
                verifyPayment({...response,courses},token,navigate,dispatch);
            }
          };
          const paymentObject=new window.Razorpay(options);
          paymentObject.open();
          paymentObject.on("payment failed",function(response){
            toast.error("oops, payment failed");
          })
    }catch(e){
        toast.error(e.response?.data?.message || e.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        // console.log("sendPaymentSuccessEmail called.....")
        // console.log("response.razorpay_order_id==>",response.razorpay_order_id)
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount:amount,
        });
    }catch(e){
        console.error("payment success email error==>",e.message);
        toast.error(e.response?.data?.message || e.message);
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("Verifying Payment....");
    try{
        // console.log("bodyData==>",bodyData);
        const response=await apiConnector("POST",VERIFY_PAYMENT,bodyData);
        toast.success("Payment Successful, you are added to the course");

        setTimeout(()=>{
            navigate("/dashboard/enrolled-courses");
        },1000);
        
        dispatch(resetCart());
    }catch(e){
        toast.error("Could not verify payment")
        toast.error(e.response?.data?.message || e.message);
    }
    toast.dismiss(toastId)
}

