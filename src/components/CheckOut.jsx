import React, { useState } from "react";
import menuService from "../appwrite/menuService.js";

const CheckOut = () => {
    const [sent, setSent] = useState([]);

    const PaymentresiveNotification = async () => {
        try {
            const order = await menuService.sendPayment({
                name: "John Doe",
                message: "New payment from client",
                amount: 500,
                time: new Date().toISOString(),
                status: "pending"
            });

            console.log("Payment sent to admin app:", order);
            setSent((prev) => [...prev, order]);
        } catch (err) {
            console.error("Error creating payment:", err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] w-full gap-5">
            <button
                className="py-3 px-8 bg-green-400 rounded-lg text-white"
                onClick={PaymentresiveNotification}
            >
                Send
            </button>

            <h2 className="text-xl font-bold">Sent Payments</h2>
            <ul className="list-disc">
                {sent.map((item) => (
                    <li key={item.$id}>
                        {item.name} — ₹{item.amount} — {item.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckOut;
