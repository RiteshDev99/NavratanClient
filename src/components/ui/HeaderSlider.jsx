import { useState } from "react";

const buttonItems = [
    { id: "1", title: "All" },
    { id: "2", title: "Fast Food" },
    { id: "3", title: "Junk Food" },
    { id: "4", title: "Jackson Food" },
    { id: "5", title: "Drink Section" },
];

export default function HeaderSlider() {
    const [activeId, setActiveId] = useState("1");

    return (
        <div className="shadow-md py-3 px-2 ">
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
                                ? "bg-[#d9832e] text-white"
                                : "text-[#144554] border-gray-300 hover:bg-gray-200"
                        }`}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none; 
                    scrollbar-width: none; 
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
