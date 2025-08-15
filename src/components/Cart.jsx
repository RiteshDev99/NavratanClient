import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, decrementItem, incrementItem } from "../store/feature/cart/cartSlice";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import {CardCart} from "./index.js";


export default function Cart() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    return (
        <div className=" min-h-screen flex flex-col">
            <div className="flex items-center p-4  shadow ">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-[#1ca671] hover:bg-gray-300 rounded-full mr-4"
                >
                    <ChevronLeftIcon className="h-6 w-6  text-white" />

                </button>
                <h1 className="text-xl text-center">Your Cart</h1>
            </div>

            <div className="flex-1 overflow-auto p-4 max-h-[80vh]">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty Cart"
                            className="w-32 h-32 opacity-50"
                        />
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <CardCart
                                key={item.$id}
                                item={item}
                                onIncrement={() =>  dispatch(incrementItem(item.$id))}
                                onDecrement={() =>  dispatch(decrementItem(item.$id))}
                                onRemove={() => dispatch(removeItem(item.$id))}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <AnimatePresence>
                {cartItems.length > 0 && (
                    <motion.div
                        className="fixed bottom-0 left-0 w-full rounded-t-3xl shadow-lg z-100 min-h-[70px] max-h-[250px] flex justify-center"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <div className="h-[57px] bg-[#1ca671] w-[95vw] flex justify-between items-center rounded-2xl px-4 text-white">
                            <p className="text-lg font-semibold">
                                Total: ₹{totalPrice}
                            </p>
                            <div className="flex items-center justify-center gap-1 cursor-pointer"
                                 onClick={() => navigate('/checkout')}
                            >
                                <p>CheckOut</p>
                                <ChevronRightIcon className="h-5 w-5" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
