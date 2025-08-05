import {configureStore} from "@reduxjs/toolkit";
import MenuItemsReducer from "./feature/menuItems/menuSlice";
const store = configureStore({
    reducer: {
        menuItems: MenuItemsReducer
    }
})

export default store;
