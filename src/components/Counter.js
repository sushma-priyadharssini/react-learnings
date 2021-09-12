import classes from './Counter.module.css';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Component } from 'react';
import { counterActions } from '../store/counter';

const Counter = () => {
  // const counter = useSelector(state => state.counter);
  // const showCounter = useSelector(state => state.showToggle);

  const counter = useSelector(state => state.counter.counter);
  const showCounter = useSelector(state => state.counter.showToggle);

  const dispatchCounter = useDispatch();

  const incrementHandler = () => {
    // dispatchCounter({ type: 'increment' });
    dispatchCounter(counterActions.increment())
  };

  const increaseHanlder = () => {
    // dispatchCounter({ type: 'decrement' })
    dispatchCounter(counterActions.increase(10))
  }

  const decrementHandler = () => {
    // dispatchCounter({ type: 'decrement' })
    dispatchCounter(counterActions.decrement())
  }

  const toggleCounterHandler = () => {
    // dispatchCounter({ type: 'toggle' })
    dispatchCounter(counterActions.toggleCounter())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      { showCounter && <div className={classes.value}>{counter}</div> }
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHanlder}>Increase</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler = () => {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
//       </main>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter
//   }
// }

// const dispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' })
//   }
// }
// export default connect(mapStateToProps, dispatchToProps)(Counter);
