import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import menuService from '../../appwrite/menuService';

export default function MenuCard({ item, onClick, isSelected }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (item.image) {
            menuService.getImageView(item.image)
                .then((url) => setImageUrl(url))
                .catch(err => console.log(err));
        }
    }, [item.image]);

    return (
        <div
            onClick={onClick}
            className={` relative my-3 rounded-lg shadow-md overflow-hidden w-[175px] h-[175px] cursor-pointer border-2 transition-all
                ${isSelected ? "border-[#d9832e] ring-2 ring-[#d9832e]" : "border-transparent"}`}
        >
            <div className="h-[132px] w-full relative">
                <img
                    src={imageUrl || ""}
                    className={`h-full w-full object-cover transition-all ${isSelected ? "opacity-70" : "opacity-100"}`}
                    alt={item.name || "Menu item"}
                />

                {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#d9832e] rounded-full p-1">
                        <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-white">
                <h3 className="text-[12px] font-semibold text-gray-800 truncate max-w-[100px]">
                    {item.name}
                </h3>
                <span className="text-[15px] font-bold text-green-600">
                    ₹{item.price}
                </span>
            </div>
        </div>
    );
}
