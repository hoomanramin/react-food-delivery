import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = value => value.trim() === "";
const isNotFiveChar = value => value.trim() < 5;

const Checkout = props => {
  const [error, setError] = useState(false)
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  })
  const cityInput = useRef();
  const nameInput = useRef();
  const postalInput = useRef();
  const streetInput = useRef();
  const confirmHandler = e => {
    e.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredPostal = postalInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredCity = cityInput.current.value;
    const enteredValidName = !isEmpty(enteredName);
    const enteredValidPostal = !isNotFiveChar(enteredPostal);
    const enteredValidStreet = !isEmpty(enteredStreet);
    const enteredValidCity = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredValidName,
      street: enteredValidStreet,
      city: enteredValidCity,
      postalCode: enteredValidPostal
    })

    const formIsValid = enteredValidName && enteredValidPostal && enteredValidStreet && enteredValidCity

    if (!formIsValid) {
      setError(true)
      return
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formInputValidity.name && classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputValidity.name && <p>Please enter valid name</p>}
      </div>
      <div className={`${classes.control} ${!formInputValidity.street && classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputValidity.street && <p>Please enter valid street</p>}

      </div>
      <div className={`${classes.control} ${!formInputValidity.postalCode && classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInput} />
        {!formInputValidity.postalCode && <p>Please enter valid postal</p>}

      </div>
      <div className={`${classes.control} ${!formInputValidity.city && classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputValidity.city && <p>Please enter valid city</p>}

      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
