import React, { useEffect, useState } from "react";
import menuService from "../appwrite/menuService.js";

import {useSelector} from "react-redux";
import {Loader, PopupModal} from "./index.js";

const CheckOut = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        setOpenPopup(true);
    }, []);


    const orderData = async (userName) => {
        try {
            if (!cartItems.length) return alert("Cart is empty");

            const totalAmount = cartItems.reduce(
                (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
                0
            );


            const itemsArray = cartItems.map(item =>
                JSON.stringify({
                    id: item.$id,
                    name: item.name,
                    quantity: item.quantity || 1,
                    price: (item.price || 0) * (item.quantity || 1),
                })
            );


            const order = await menuService.sendOrderItem({
                name: userName,
                totalAmount: totalAmount,
                items: itemsArray,
                status: 'pending',
                datetime: new Date().toISOString(),
                paymentStatus: 'pending',
            });

            console.log("Order sent to admin app:", order);
            setOpenPopup(false);
            setOrderConfirmed(true);
        } catch (error) {
            console.error("Error creating orderData:", error);
        }
    };


    // const handlePayment = async (userName) => {
    //     try {
    //         const order = await menuService.sendPayment({
    //             name: userName,
    //             message: "New payment from client",
    //             amount: 500,
    //             time: new Date().toISOString(),
    //             status: "pending",
    //         });
    //
    //         console.log("Payment sent to admin app:", order);
    //         setSent((prev) => [...prev, order]);
    //     } catch (err) {
    //         console.error("Error creating payment:", err);
    //     }
    // };

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] w-full gap-5">
            {openPopup ? (
                <PopupModal
                    isOpen={openPopup}
                    onClose={() => setOpenPopup(false)}
                    onSubmit={orderData}
                />
            ) : orderConfirmed ? (
                <h2 className="text-xl font-bold text-green-600">Your order is confirmed ✅</h2>
            ) : (
                <Loader/>
            )}
        </div>
    );
};

export default CheckOut;
