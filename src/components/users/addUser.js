import { useState, Fragment, useRef } from 'react';
import Button from '../ui/button';
import Card from '../ui/card';
import ErrorModal from '../ui/errorModal';
import classes from '../users/addUser.module.css';
// import Wrapper from '../helpers/wrapper';

const AddUser = (props) => {
    const [input, setInput ] = useState({
        name: '',
        age: ''
    });
    const [error, setError] = useState();
    
    // To refer dom elements, can go with this if we dont have anything to validate on every field keystroke
    const nameRef = useRef();
    const ageRef = useRef();

    const onInputChangeHandler = (fieldId, event) => {
        const obj = {};
        obj[fieldId] = event.target.value;
        setInput((prevValue) => {
            return {
                ...prevValue,
                ...obj
            }
        });
    }

    const onAddUserHandler = (event) => {
        event.preventDefault();

        // gives current value
        // No need of state here and no need of onInputChangeHandler to update input on every keystroke
        const name = nameRef.current.value;
        const age = ageRef.current.value;

        if(input.name.trim().length === 0 || input.age.trim().length === 0) {
            setError({
                errorTitle: 'Invalid input!',
                errorMessage: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        if(+input.age < 1) {
            setError({
                errorTitle: 'Invalid age!',
                errorMessage: 'Please enter a valid age (> 0).'
            })
            return;
        }
        props.onAddUser({...input, id: Math.random(0,100)});
        setInput(() => {
            return {
                name: '',
                age: ''
            }
        });
        /* 
        Can do this, it works, but not a great advice, Generally refs are preferred to read values,
        state is preferred if we want to update values in DOM. Proper and nicer way.
        Not good to use state to just read values. Just lot of code work to just read value. 
        */

        // nameRef.current.value = '';
        // ageRef.current.value = ''
    };

    const onOkayHandler = () => {
        setError(null);
    }

    return (
        // <Wrapper>
        <Fragment>
            <Card className={classes.input}>
                <form onSubmit={onAddUserHandler}>
                    <label htmlFor="userName">User Name</label>
                    <input 
                        name="userName"
                        type="text"
                        value={input.name}
                        onChange={onInputChangeHandler.bind(this, 'name')}
                        ref={nameRef}>
                    </input>
                    <label htmlFor="age">Age (years)</label>
                    <input 
                        name="age" 
                        type="number"
                        value={input.age}  
                        onChange={onInputChangeHandler.bind(this, 'age')}
                        ref={ageRef}>
                    </input>
                    <Button type="submit">Add user</Button>
                </form>
            </Card>
            {error &&
                <ErrorModal errorTitle={error.errorTitle} errorMessage={error.errorMessage} onOkay={onOkayHandler}></ErrorModal>
            }
        {/* </Wrapper> */}
        </Fragment>
    );
}

export default AddUser;