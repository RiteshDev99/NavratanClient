import { useState, useEffect} from "react";
import menuService from '../../appwrite/menuService'

export default function MenuCard({ item, onClick }) {

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (item.image) {
            menuService.getImageView(item.image)
                .then((url)=> {
                    setImageUrl(url);
                    console.log(url)
                })
                .catch(err => console.log(err));
        }
    }, [item.image]);
    
    return (
        <div
            onClick={onClick}
            className=" my-4 rounded-lg shadow-md overflow-hidden w-[160px] h-[160px] cursor-pointer "
        >
            <div className="h-[120px] w-full ">
                <img
                    src={imageUrl || ""}
                    className="h-full w-full object-cover"
                    alt={item.name || "Menu item"}
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
