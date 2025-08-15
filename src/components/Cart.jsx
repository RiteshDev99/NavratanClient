
import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
    const cartItems = useSelector(state => state.cart.items);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="space-y-2">
                    {cartItems.map(item => (
                        <li key={item.$id} className="border p-2 rounded">
                            <h2 className="font-semibold">{item.name}</h2>
                            <p>Price: ${item.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
