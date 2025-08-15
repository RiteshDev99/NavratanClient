import React, { useEffect, useMemo, useState } from "react";
import { MenuCard } from "./index.js";
import { useDispatch, useSelector } from "react-redux";
import menuService from "../appwrite/menuService.js";
import { setMenuItems } from "../store/feature/menuItems/menuSlice.js";
import ShimmerEffect from "./ui/ShimmerEffect.jsx";
import { toggleItem } from "../store/feature/cart/cartSlice.js";
import {useNavigate} from "react-router-dom";

const buttonItems = [
    { id: "1", title: "All" },
    { id: "2", title: "Fast-Food" },
    { id: "3", title: "Junk-Food" },
    { id: "4", title: "Soft-Drink" },
    { id: "5", title: "Healthy-Drink" },
];

export default function MenuFilterBar() {
    const [activeId, setActiveId] = useState("1");
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const arr = Array.from({ length: 10 });
    const navigate = useNavigate();
    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const res = await menuService.getMenuItems();
            if (res?.documents) {
                dispatch(setMenuItems(res.documents));
                setItems(res.documents);
            } else {
                setItems([]);
            }
        } catch (err) {
            console.error("Error fetching menu items:", err);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const filteredItems = useMemo(() => {
        if (activeId === "1") return items;
        const categoryTitle = buttonItems.find((btn) => btn.id === activeId)?.title;
        return items.filter((post) => post.category === categoryTitle);
    }, [activeId, items]);

    const toggleSelect = (itemId) => {
        const item = items.find((i) => i.$id === itemId);
        if (item) {
            dispatch(toggleItem(item));
        }
    };

    return (
        <>
            <div className="shadow-md py-3 px-2 w-full">
                <div
                    className="flex gap-2 overflow-x-auto scrollbar-hide"
                    style={{
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {buttonItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={`flex-shrink-0 px-3 sm:px-4 py-[6px] rounded-full border text-xs sm:text-sm md:text-base transition-all whitespace-nowrap scroll-snap-align-start ${
                                activeId === item.id
                                    ? "bg-[#d9832e] text-white border-[#d9832e]"
                                    : "text-[#144554] border-gray-300 hover:bg-gray-200"
                            }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-screen w-full mt-2">
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
                        {arr.map((_, index) => (
                            <ShimmerEffect key={index} />
                        ))}
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center">
                        {filteredItems.map((item) => (
                            <MenuCard
                                key={item.$id}
                                item={item}
                                isSelected={cartItems.some((i) => i.$id === item.$id)}
                                onClick={() => toggleSelect(item.$id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-center text-gray-600 text-lg">
                            No menu items found for this category.
                        </p>
                    </div>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full rounded-t-3xl shadow-lg z-100 min-h-[70px] max-h-[250px] flex justify-center"
                     onClick={() => navigate("/cart")}

                >
                    <div className="h-[57px] bg-[#1ca671] w-[95vw] flex justify-between items-center rounded-2xl px-4 text-white">
                        <div className="flex items-center justify-center gap-2">
                            <p>{cartItems.length}</p>
                            <p>Item{cartItems.length > 1 ? "s" : ""} added</p>
                        </div>
                        <div>
                            <p className="cursor-pointer">View Cart</p>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    );
}
