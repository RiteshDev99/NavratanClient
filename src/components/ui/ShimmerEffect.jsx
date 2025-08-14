import React from "react";

const ShimmerEffect = () => {
    return (
        <div className="my-4 rounded-lg shadow-md overflow-hidden w-[175px] h-[175px] cursor-pointer bg-[#f5f5f8]">
            <div className="h-[132px] w-full relative overflow-hidden rounded">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            </div>
            
            <div className="flex items-center justify-between px-3 py-2">
                <div className="h-3 w-[65px] relative overflow-hidden rounded">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                </div>
                <div className="h-3 w-[35px] relative overflow-hidden rounded">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                </div>
            </div>
        </div>
    );
};

export default ShimmerEffect;
