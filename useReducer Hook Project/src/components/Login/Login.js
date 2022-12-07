import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (latestStateSnapShot, action) => {
  if (action.type === "USER_EMAIL") {
    return { value: action.val, isValid: action.val.includes('@') }
  }

  if (action.type === "USER_VALIDATE") {
    return { value: latestStateSnapShot.value, isValid: latestStateSnapShot.value.includes("@") }
  }
  return { value: "", isValid: false };
}

const passReducer = (latestStateSnapShot, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }

  if (action.type === "PASS_VALIDATE") {
    return { value: latestStateSnapShot.value, isValid: latestStateSnapShot.value.trim().length > 6 }
  }
  return { value: "", isValid: false }
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [passState, passDispatchFn] = useReducer(passReducer, { value: "", isValid: null })
  const [emailState, emailDispatchFn] = useReducer(emailReducer, { value: "", isValid: null })
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {

    emailDispatchFn({ type: "USER_EMAIL", val: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    passDispatchFn({ type: "USER_PASS", val: event.target.value })
  };

  const validateEmailHandler = () => {
    emailDispatchFn({ type: "USER_VALIDATE" })
  };

  const validatePasswordHandler = () => {
    passDispatchFn({ type: "PASS_VALIDATE" })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
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
