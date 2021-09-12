import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        addToCart(state, action) {
            const itemToAdd = action.payload;
            const existingItem = state.items.find(item => item.id === itemToAdd.id);
            state.totalQuantity++;
            state.changed = true;
            if(existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
            } else {
                state.items.push({
                    id: itemToAdd.id,
                    title: itemToAdd.title,
                    price: itemToAdd.price,
                    totalPrice: itemToAdd.price,
                    quantity: 1
                });
            }
        },
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        removeFromCart(state, action) {
            const itemToRemoveId = action.payload;
            state.totalQuantity--;
            state.changed = true;
            const existingItem = state.items.find(item => item.id === itemToRemoveId);
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== itemToRemoveId)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer