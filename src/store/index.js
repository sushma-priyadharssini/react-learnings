import { createStore, combineReducers } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';


// const store = createStore(counterSlice.reducer) - for 1 reducer

// for multiple reducers
// const store = configureStore({
//     reducer: counterSlice.reducer
// });

const store = configureStore({
    reducer: { 
        counter: counterReducer,
        auth: authReducer
    }
});

// const counterReducer = (state = initialState, action) => {
//     if (action.type === 'increment') {
//         return {
//             counter: state.counter + 1,
//             showToggle: state.showToggle // need to return all the states even if they dont change
//         }
//     } 
//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1,
//             showToggle: state.showToggle
//         }
//     }
//     if (action.type === 'toggle') {
//         return {
//             showToggle: !state.showToggle,
//             counter: state.counter
//         }
//     }
//     return state;
// }

// const store = createStore(counterReducer);

// const counterSubscriber = () => {
//     console.log(store.getStore())
// }

// store.subscribe(counterSubscriber);

// store.dispatch({ type: 'increment'})

export default store;