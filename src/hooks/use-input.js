import { useState } from 'react';

const useInput = (validateValue) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(value);
    const hasError = !isValid && isTouched;

    const onChangeHandler = (event) =>  {
        setValue(event.target.value)
        setIsTouched(true);
    }

    const onBlurHandler = () => {
        setIsTouched(true);
    }

    const resetHandler = () => {
        setValue('');
        setIsTouched(false);
    }

    return {
        value,
        isValid,
        hasError,
        onChangeHandler,
        onBlurHandler,
        resetHandler
    }
}

export default useInput;