import React from "react";

export default function MenuCard({ item, onClick }) {
    return (
        <div
            onClick={onClick}
            className=" my-4 rounded-lg shadow-md overflow-hidden w-[150px] h-[150px] cursor-pointer "
        >
            <div className="h-[110px] w-full ">
                <img
                    src={item.image}
                    className="h-full w-full object-cover"
                    alt={''}
                />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
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
