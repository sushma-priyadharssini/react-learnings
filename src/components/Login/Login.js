import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return { value: '', isValid: false }; // whatever is returned sets the value for inputs and in states
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }

  return { value: '', isValid: false }; // whatever is returned sets the value for inputs and in states
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });

  // useEffect(() => {
  //   const identifier = setTimeout(() => { // setTimeout, because you dont want to flood http requests with every keystroke, so debounc implementation
  //     console.log('Validating ...');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return (() => {
  //     console.log('Clean Up function');
  //     clearTimeout(identifier);
  //   })
  // }, [enteredEmail, enteredPassword]);

  const { isValid: isEmailValid } = emailState; // isEmailValid is alias
  const { isValid: isPasswordValid } = passwordState;

  // To optimise it more to check only validation change
  useEffect(() => {
    const identifier = setTimeout(() => { // setTimeout, because you dont want to flood http requests with every keystroke, so debounc implementation
      console.log('Validating ...');
      setFormIsValid(
        isEmailValid && isPasswordValid
      );
    }, 500);
    return (() => {
      console.log('Clean Up function');
      clearTimeout(identifier);
    })
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    /* Commented out for useEffect() usage over normal behavior

    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    ); */

    // To show useReducer() usage
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    })
    // useEffect() instead since it is still using passwordState here
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    /* Commented out for useEffect() usage over normal behavior

    setEnteredPassword(event.target.value);
    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    ); */

    // To show useReducer() usage
    dispatchPassword({
      type: 'USER_INPUT',
      val: event.target.value
    })
    // useEffect() instead
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.value.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ''
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
