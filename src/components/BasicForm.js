import useInput from "../hooks/use-input";


const isNotEmpty = val => val.trim() !== '';
const isEmailValid = val => val.includes('@');

const BasicForm = (props) => {
  const {
    value: nameValue,
    isValid: isNameValid,
    hasError: hasNameError,
    onChangeHandler: onNameChangeHandler,
    onBlurHandler: onNameBlurHandler,
    resetHandler: nameResetHandler
   } = useInput(isNotEmpty);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if(!isNameValid) {
      return;
    }
    nameResetHandler();
  }

  const isFormValid = !!isNameValid;
  const formClass = hasNameError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={formClass}>
          <label htmlFor='name'>First Name</label>
          <input 
              type='text' 
              id='name'
              value={nameValue}
              onChange={onNameChangeHandler}
              onBlur={onNameBlurHandler} />
          {hasNameError && <p className="error-text">Enter Valid Value</p>}
        </div>
        {/* <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' />
        </div> */}
      </div>
      {/* <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' />
      </div> */}
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
