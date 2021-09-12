import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addToCart(state, action) {
            const itemToAdd = action.payload;
            const existingItem = state.items.find(item => item.id === itemToAdd.id);
            state.totalQuantity++;
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
        removeFromCart(state, action) {
            const itemToRemoveId = action.payload;
            state.totalQuantity--;
            const existingItem = state.items.find(item => item.id === itemToRemoveId);
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id === itemToRemoveId)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));
        const sendRequest = async () => {
            const resp = await fetch('https://react-test-68f18-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
              method: 'PUT',
              body: JSON.stringify(cart)
            });
            if(!resp.ok) {
              throw new Error('Sending cart data failed');
            }
            // const data = await resp.json();
        }
        try{
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully'
            }))
        } 
        catch(error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed'
            }))
        }
    }
}
export const cartActions = cartSlice.actions;
export default cartSlice.reducer