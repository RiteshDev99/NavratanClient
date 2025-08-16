import React, { useState } from "react";
import {Logo} from "../index.js";

const PopupModal = ({ isOpen, onClose, onSubmit, title = "Enter Your Name", placeholder = "Type here" }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (inputValue.trim() === "") {
            setError("This field is required");
            return;
        }
        onSubmit(inputValue);
        setInputValue("");
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-80">
                <div className=' justify-center flex flex-col items-center gap-4'>
                    <Logo/>
                    <h2 className="text-lg font-semibold mb-4">{title}</h2>
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border rounded mb-2"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="flex justify-center mt-3">
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-2 bg-[#1ca671] text-white rounded"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;
