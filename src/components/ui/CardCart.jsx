import React, {useEffect, useState} from "react";
import menuService from "../../appwrite/menuService.js";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function CardCart({ item, onIncrement, onDecrement, onRemove }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (item.image) {
            menuService.getImageView(item.image)
                .then((url) => setImageUrl(url))
                .catch(err => console.log(err));
        }
    }, [item.image]);


    return (
        <div className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between gap-4">

            <div className="w-20 h-20 flex-shrink-0">
                <img
                    src={imageUrl || ""}
                    className="w-full h-full object-cover rounded-lg"
                 alt={''}/>
            </div>
            <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-500 mt-1">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg font-bold"
                    onClick={onDecrement}
                >
                    -
                </button>
                <span className="font-medium text-gray-800">{item.quantity || 1}</span>
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg font-bold"
                    onClick={onIncrement}
                >
                    +
                </button>
            </div>
            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer"
                       onClick={onRemove}
            />
        </div>
    );
}
