import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMenuItems } from "../../store/feature/menuItems/menuSlice.js";
import menuService from "../../appwrite/menuService.js";
import {HeaderSlider, Loader, MenuCard} from "../index.js";

function Home() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();

    const fetchMenuItems = async () => {
        try {
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

    return (
        <div className="min-h-screen w-full ">
            <HeaderSlider />

            <div className="">
                {loading ? (
                    <Loader loading={loading} />
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 justify-items-center">
                        {items.map((item) => (
                            <MenuCard
                                key={item.$id}
                                item={{
                                    name: item.name,
                                    price: item.price,
                                    image: menuService.getImagePreview(item.image)?.href || "",
                                }}
                                onClick={() => console.log("Clicked:", item.name)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No menu items found.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
