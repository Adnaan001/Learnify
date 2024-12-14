import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState={
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalPrice : localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : 0,
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        settotalItems : (state,action)=>{
            state.totalItems=action.payload;
        },
        resetCart:(state,action)=>{
            state.cart=[];
            state.totalItems=0;
            state.totalPrice=0;

            localStorage.setItem("cart",JSON.stringify([]));
            localStorage.setItem("totalItems",0);
            localStorage.setItem("totalPrice",0);
            
        },
        addToCart : (state,action)=>{
            const course=action.payload;
            const index=state.cart.findIndex((item)=> item._id === course._id);

            if(index>=0)
            {
                toast.error("Course is already in cart");
                return;
            }

            state.cart.push(course);
            state.totalItems++;
            state.totalPrice+=course.price;
            
            localStorage.setItem("totalItems",state.totalItems);
            localStorage.setItem("totalPrice",state.totalPrice);
            localStorage.setItem("cart",JSON.stringify(state.cart));

            toast.success("Course added to cart")
        },
        removeFromCart : (state,action)=>{
            const courseId=action.payload;
            const index=state.cart.findIndex((item)=>item._id === courseId);

            if(index>=0)
            {
                state.totalPrice-=state.cart[index].price;
                state.cart=state.cart.filter((item)=>item._id !== courseId)
                state.totalItems--;
                
                localStorage.setItem("totalItems",state.totalItems);
                localStorage.setItem("totalPrice",state.totalPrice);
                localStorage.setItem("cart",JSON.stringify(state.cart));

                toast.success("Course successfully removed from the cart")

                return;
            }

            toast.error("Course was already removed from the cart");
       }
    }
})


export const {settotalItems,resetCart,addToCart,removeFromCart}=cartSlice.actions;
export default cartSlice.reducer;
