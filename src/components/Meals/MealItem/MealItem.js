import {useContext} from "react";
import CartCTX from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({name, description, price, id}) => {
  const formatedPrice = `$${price.toFixed(2)}`;
  const itemCTX = useContext(CartCTX);
  const addItemHandler = amount => {
    itemCTX.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount,
      description: description,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{formatedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddItem={addItemHandler} />
      </div>
    </li>
  );
};

export default MealItem;
