import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { 
    counter: 0,
    showToggle: true
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload // payload is default arg name that redux toolkit attaches from the arg we pass
        },
        toggleCounter(state) {
            state.showToggle = !state.showToggle;
        }
    }
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer; 