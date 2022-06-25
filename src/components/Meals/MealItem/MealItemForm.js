import {useRef, useState} from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = props => {
  const [error, setError] = useState(false);
  const amountInput = useRef();

  const submitHandler = e => {
    e.preventDefault();
    const enterdAmount = amountInput.current.value;
    const convertedAmount = +enterdAmount;
    if (
      enterdAmount.trim().length === 0 ||
      convertedAmount < 1 ||
      convertedAmount > 5
    ) {
      setError(true);
      return;
    }
    props.onAddItem(convertedAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInput}
        label={"Amount"}
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {error && <p>Please enter valid amount</p>}
    </form>
  );
};

export default MealItemForm;
