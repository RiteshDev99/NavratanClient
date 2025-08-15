import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const exists = state.items.find(i => i.$id === action.payload.$id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        incrementItem: (state, action) => {
            const item = state.items.find(i => i.$id === action.payload);
            if (item) {
                item.quantity = (item.quantity || 1) + 1;
            }
        },
        decrementItem: (state, action) => {
            const item = state.items.find(i => i.$id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter(i => i.$id !== action.payload);
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(i => i.$id !== action.payload);
        },
        toggleItem: (state, action) => {
            const exists = state.items.find(i => i.$id === action.payload.$id);
            if (exists) {
                state.items = state.items.filter(i => i.$id !== action.payload.$id);
            } else {
                state.items.push(action.payload);
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addItem, removeItem, toggleItem, incrementItem,    decrementItem, learCart } = cartSlice.actions;
export default cartSlice.reducer;
