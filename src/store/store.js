import {configureStore} from "@reduxjs/toolkit";
import MenuItemsReducer from "./feature/menuItems/menuSlice";
import cartReducer from "./feature/cart/cartSlice";

const store = configureStore({
    reducer: {
        menuItems: MenuItemsReducer,
        cart: cartReducer
    }
})

export default store;
