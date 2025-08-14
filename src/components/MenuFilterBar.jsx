import React, {useEffect, useMemo, useState} from "react";
import { MenuCard } from "./index.js";
import { useDispatch } from "react-redux";
import menuService from "../appwrite/menuService.js";
import { setMenuItems } from "../store/feature/menuItems/menuSlice.js";
import ShimmerEffect from "./ui/ShimmerEffect.jsx";
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
    const [selectedIds, setSelectedIds] = useState([]);
    const [openSheet , setOpenSheet] = useState(false);
    const dispatch = useDispatch();
    const arr = Array.from({ length: 10 });
    const [selectedItem, setSelectedItem] = useState([]);
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
        if (activeId === '1') return items;
        const categoryTitle = buttonItems.find(btn => btn.id === activeId)?.title;
        return items.filter(post => post.category === categoryTitle);
    }, [activeId, items]);


    const toggleSelect = (itemId) => {
        const item = items.find(i => i.$id === itemId);

        setSelectedIds((prev) => {
            const isSelected = prev.includes(itemId);
            let updatedIds;

            if (isSelected) {
                updatedIds = prev.filter(id => id !== itemId);
                setSelectedItem(prevItems => prevItems.filter(i => i.$id !== itemId));
            } else {
                updatedIds = [...prev, itemId];
                setSelectedItem(prevItems => {
                    const exists = prevItems.some(i => i.$id === item.$id);
                    return exists ? prevItems : [...prevItems, item];
                });
            }

            setOpenSheet(updatedIds.length > 0);
            return updatedIds;
        });
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
                            className={`flex-shrink-0  px-3 sm:px-4 py-[6px] rounded-full border text-xs sm:text-sm md:text-base transition-all whitespace-nowrap scroll-snap-align-start ${
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 justify-items-center ">
                        {filteredItems.map((item) => (
                            <MenuCard
                                key={item.$id}
                                item={item}
                                isSelected={selectedIds.includes(item.$id)}
                                onClick={() => {
                                    toggleSelect(item.$id);
                                    console.log(item.$id);
                                }}
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
            {openSheet && selectedItem.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-sky-100 rounded-t-3xl shadow-lg z-100 min-h-[150px] max-h-[250px] flex flex-col">

                    <div className="flex-1 overflow-y-auto p-4">
                        {selectedItem.map((item) => (
                            <div key={item.$id} className="flex gap-3 mb-2 items-center">
                                <p className='text-[12px] font-semibold text-gray-800 truncate max-w-[100px]'>{item.name}</p>
                                <p className='text-[12px] font-bold text-green-600'>₹{item.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-300 bg-sky-100">
                        <button
                            onClick={() => navigate("/proceed-to-payment")}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
                        >
                            Proceed to Payment
                        </button>
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
