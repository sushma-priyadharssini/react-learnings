import { uiActions } from './ui';
import { cartActions } from './cart';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const resp = await fetch('https://react-test-68f18-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json');
            if(!resp.ok) {
                throw new Error('Sending cart data failed');
            }
            const data = await resp.json();
            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity || 0
            }));

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Failed to fetch cart'
            }))
        }
    }
}

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
              body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity })
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