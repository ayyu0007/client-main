import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    carts: JSON.parse(localStorage.getItem("carts")) || []
};

// cart slice
const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        // add to cart
        addToCart: (state, action) => {
            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.carts[itemIndex].qnty += 1;
            } else {
                const temp = { ...action.payload, qnty: 1 };
                state.carts = [...state.carts, temp];
            }
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },

        // remove particular items
        removeToCart: (state, action) => {
            const data = state.carts.filter((item) => item.id !== action.payload);
            state.carts = data;
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },

        // remove single items
        removeSingleItem: (state, action) => {
            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
            if (state.carts[itemIndex].qnty >= 1) {
                state.carts[itemIndex].qnty -= 1;
                localStorage.setItem("carts", JSON.stringify(state.carts));
            }
        },

        // clear cart
        emptyCart: (state) => {
            state.carts = [];
            localStorage.setItem("carts", JSON.stringify(state.carts));
        }
    }
});

export const { addToCart, removeToCart, removeSingleItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
